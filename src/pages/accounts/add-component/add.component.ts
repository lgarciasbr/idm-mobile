import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasicValidators } from '../../../shared/basic.validators';
import { CRUDService } from '../../../providers/generic.crud.service';
import { Account } from '../../../providers/account';

import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-add',
    templateUrl: 'add.component.html'
})
export class AccountAddPage {
    private form: FormGroup;
    private type = 'accounts';
    private pageTitle = 'Account Details';
    public ItemVO = new Account();

    constructor(
        private app: App,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private fb: FormBuilder,
        private crudService: CRUDService) {
        this.form = fb.group({
            email: ['', BasicValidators.email],
            password: ['', Validators.required]
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
                data => this.ItemVO = data.account,
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
