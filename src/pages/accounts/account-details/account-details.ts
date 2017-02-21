import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AccountsService } from '../../../providers/accounts.service';
import { AuthService } from '../../../providers/auth.service';

import { AccountsPage } from '../accounts-component/accounts';
import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-details',
    templateUrl: 'account-details.html'
})
export class AccountDetailsPage {
    account: any;

    constructor(
        private app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private _auth: AuthService,
        private _account: AccountsService) {

        this.GetAccount(navParams.get('account'))
    }

    ionViewDidLoad() {
    }

    Back(){
        this.navCtrl.pop(AccountsPage);
    }

    Alert(message, page?){
        let alert = this.alertCtrl.create({
            title: 'Account',
            subTitle: message,
            buttons: [{
                text: 'Account not found.',
                handler: () => {
                    if(page)
                        this.navCtrl.pop(page);
                }
            }]
        });
        alert.present();
    }

    GetAccount(account){
        var loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })
        loader.present();

        this._account.GetUser(account)
            .subscribe(
                data => this.account = data.account,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this._auth.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else if (response.status == 404) {
                        loader.dismiss();
                        this.Alert('Account not found.', AccountsPage)
                    }
                    else  {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message)
                        this.navCtrl.pop(AccountsPage);
                    }
                },
                () => {
                    loader.dismiss();
                }
            );
    }

    ConfirmDelAccount(account){
        let alert = this.alertCtrl.create({
            title: 'Account',
            subTitle: 'Are you sure you want to delete ' + account.email + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {}
                },
                {
                    text: 'Delete',
                    handler: data => {
                        this.DelAccount(account);
                    }
                }
            ]
        });
        alert.present();
    }

    DelAccount(account){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent",
            dismissOnPageChange: true
        })
        loader.present();

        this._account.DeleteUser(account)
            .subscribe(
                data => this.account = data.account,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this._auth.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else if (response.status == 404) {
                        loader.dismiss();
                        this.Alert('Account not found.', AccountsPage)
                    }
                    else {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.navCtrl.pop(AccountsPage);
                }
            );
    }

}
