import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import md5 from 'crypto-md5';

import { CRUDService } from '../../../providers/generic.crud.service';
import { Account } from '../../../providers/account';

import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-details',
    templateUrl: 'details.component.html'
})
export class AccountDetailsPage {
    private pageTitle = 'Account Details';
    public ItemVO = new Account();

    constructor(
        private app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private crudService: CRUDService) {

        this.ItemVO._avatar = "https://www.gravatar.com/avatar/?d=mm";
        this.GetItem(navParams.get('item'))
    }

    GetItem(item){
        var loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })
        loader.present();

        this.crudService.GetItem(item)
            .subscribe(
                data => this.ItemVO = data.account,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this.crudService.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else if (response.status == 404) {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message, true)
                    }
                    else  {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message)
                        this.navCtrl.pop();
                    }
                },
                () => {
                    this.ItemVO._avatar = "https://www.gravatar.com/avatar/" + md5(item.email.toLowerCase(), 'hex') + "?d=mm";
                    loader.dismiss();
                }
            );
    }

    ConfirmDelete(item){
        let alert = this.alertCtrl.create({
            title: this.pageTitle,
            subTitle: 'Are you sure you want to delete ' + item.email + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {}
                },
                {
                    text: 'Delete',
                    handler: data => {
                        this.DeleteItem(item);
                    }
                }
            ]
        });
        alert.present();
    }

    DeleteItem(item){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent",
            dismissOnPageChange: true
        })
        loader.present();

        this.crudService.DeleteItem(item)
            .subscribe(
                data => this.ItemVO = data.account,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this.crudService.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else if (response.status == 404) {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message, true)
                    }
                    else {
                        loader.dismiss();
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

    Alert(message, back?){
        let alert = this.alertCtrl.create({
            title: this.pageTitle,
            subTitle: message,
            buttons: [{
                text: 'Dismiss',
                handler: () => {
                    if(back)
                        this.navCtrl.pop();
                }
            }]
        });
        alert.present();
    }

}
