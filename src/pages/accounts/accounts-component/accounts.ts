import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import md5 from 'crypto-md5';
import 'rxjs/add/operator/map';

import { AccountsService } from '../../../providers/accounts.service';
import { AuthService } from '../../../providers/auth.service';

import { AccountDetailsPage } from '../account-details/account-details';
import { AccountAddPage } from '../account-add/account-add';
import { AuthPage } from '../../auth/auth';

import { Account } from '../../../providers/account'

@Component({
    selector: 'page-accounts',
    templateUrl: 'accounts.html'
})
export class AccountsPage {
    accounts: Account[];
    isSearchBarVisible = false;
    profilePicture = "https://www.gravatar.com/avatar/" + md5('evon.burleigh@beer.com', 'hex') + "?d=mm"; //this.email.toLowerCase(), 'hex');

    constructor(
        private app: App,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private _service: AccountsService,
        private _auth: AuthService){
    }

    ionViewWillEnter(){
        this.GetUsers();
    }

    ChangeSearchBarStatus(){
        this.isSearchBarVisible = !this.isSearchBarVisible
    }

    GetUsers(page?, loading?){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })
        //if (loading)
        loader.present();

        this._service.GetUsers(page)
            .subscribe(
                data => this.accounts = data.accounts,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this._auth.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    for (let account of this.accounts) {
                        account._avatar = "https://www.gravatar.com/avatar/" + md5(account.email.toLowerCase(), 'hex') + "?d=mm";
                    }
                    loader.dismiss();
                }
            );
    }

    DoRefresh(refresher) {
        this.GetUsers()

        refresher.complete();
    }

    GetUser(account) {
        this.navCtrl.push(AccountDetailsPage, {account});
    }

    AddUser() {
        this.navCtrl.push(AccountAddPage);
    }

    Alert(message){
        let alert = this.alertCtrl.create({
            title: 'Account',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }

}
