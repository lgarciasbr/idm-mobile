import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
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
    private form: FormGroup;
    public appName = AppConfig.appName;
    private pageTitle = 'Auth';
    private type = 'auth';
    private ItemVO = new Account();

    constructor(
        public navCtrl: NavController,
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

    Login(){
        var token;

        this.form.disable();

        this.crudService.AddItem(this.type, this.ItemVO)
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
            title: this.pageTitle,
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }

}
