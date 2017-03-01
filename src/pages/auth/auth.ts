import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Config } from 'ionic-angular';

import { AppConfig } from '../../providers/config.service.ts';
import { CRUDService } from '../../providers/generic.crud.service';
import { Account } from '../../providers/account';
import { BasicValidators } from '../../shared/basic.validators';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html'
})
export class AuthPage {
    public appName = AppConfig.appName;
    private form: FormGroup;
    private account = new Account();

    constructor(
        private app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        private alertCtrl: AlertController,
        private fb: FormBuilder,
        private storage: Storage,
        private config: Config,
        private crudService: CRUDService) {
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

        this.crudService.AddItem('auth', this.account)
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
