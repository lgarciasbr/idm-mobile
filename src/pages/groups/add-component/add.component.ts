import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CRUDService } from '../../../providers/generic.crud.service';
import { Group } from '../../../providers/group';

import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-add',
    templateUrl: 'add.component.html'
})
export class GroupAddPage {
    private form: FormGroup;
    private type = 'groups';
    private pageTitle = 'Add Group';
    public ItemVO = new Group();

    constructor(
        private app: App,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private fb: FormBuilder,
        private crudService: CRUDService) {
        this.form = fb.group({
            name: ['', Validators.required]
        });
    }

    AddItem(){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent",
            dismissOnPageChange: true
        })
        loader.present();

        this.form.disable();

        this.crudService.AddItem(this.type, this.ItemVO)
            .subscribe(
                data => this.ItemVO = data.group,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this.crudService.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else {
                        loader.dismiss();
                        this.form.enable();
                        this.Alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.navCtrl.pop();
                }
            );
    }

    Back(){
        this.navCtrl.pop();
    }

    Alert(message){
        let alert = this.alertCtrl.create({
            title: this.pageTitle,
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }

}
