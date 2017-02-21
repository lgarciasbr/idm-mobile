import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { AccountsService } from '../../../providers/accounts.service';
import { AuthService } from '../../../providers/auth.service';

import { AccountDetailsPage } from '../account-details/account-details';
import { AccountAddPage } from '../account-add/account-add';
import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-accounts',
    templateUrl: 'accounts.html'
})
export class AccountsPage {
    accounts: any[];
    isSearchBarVisible = false;

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

    GetUsers(page?){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })
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
