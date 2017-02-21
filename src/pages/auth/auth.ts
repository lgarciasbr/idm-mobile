import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Config } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { BasicValidators } from '../../shared/basic.validators';

import { Account } from '../../providers/account';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html'
})
export class AuthPage {
    public projectWebName = 'LG idM';
    private form: FormGroup;
    private accountDetail = new Account();

    constructor(
        private app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        private alertCtrl: AlertController,
        private fb: FormBuilder,
        private storage: Storage,
        private config: Config,
        private authService: AuthService) {
            this.form = fb.group({
                email: ['', BasicValidators.email],
                password: ['', Validators.required]
            });
            menuCtrl.enable(false);
    }

    ionViewDidLoad() {
    }

    Login(){
        var token;

        this.form.disable();

        this.authService.Login(this.accountDetail.email, this.accountDetail.password)
            .subscribe(
                data => token = data._token,
                response => {
                    this.form.enable();
                    this.alert(JSON.parse(response._body).message);
                },
                () => {
                    this.storage.set('idM-token',token)
                    this.config.set('idM-token', token);
                    this.navCtrl.push(TabsPage);
                }
            );
    }

    alert(message){
        let alert = this.alertCtrl.create({
            title: 'Auth',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }

}
