import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasicValidators } from '../../../shared/basic.validators';
import { AccountsService } from '../../../providers/accounts.service';
import { AuthService } from '../../../providers/auth.service';

import { Account } from '../../../providers/account';

import { AccountsPage } from '../accounts-component/accounts';
import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-add',
    templateUrl: 'account-add.html'
})
export class AccountAddPage {
    private form: FormGroup;
    private accountDetail = new Account();

    constructor(
        private app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private fb: FormBuilder,
        private _account: AccountsService,
        private _auth: AuthService) {
        this.form = fb.group({
            email: ['', BasicValidators.email],
            password: ['', Validators.required]
        });
    }

    AddAccount(){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent",
            dismissOnPageChange: true
        })
        loader.present();

        this.form.disable();

        this._account.AddUser(this.accountDetail)
            .subscribe(
                data => this.accountDetail = data.account,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this._auth.Logout();
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else {
                        loader.dismiss();
                        this.form.enable();
                        this.Alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.navCtrl.pop(AccountsPage);
                }
            );
    }

    Back(){
        this.navCtrl.pop(AccountsPage);
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
