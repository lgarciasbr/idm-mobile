import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import md5 from 'crypto-md5';
import 'rxjs/add/operator/map';

import { CRUDService } from '../../../providers/generic.crud.service';

import { AccountDetailsPage } from '../account-details/account-details';
import { AccountAddPage } from '../account-add/account-add';
import { AuthPage } from '../../auth/auth';

import { Account } from '../../../providers/account';

@Component({
    selector: 'page-account-list',
    templateUrl: 'list.component.html'
})
export class AccountsListPage {
    private pageTitle = 'Accounts';
    private type = 'accounts';
    public ItemsVO: Account[];
    public isSearchBarVisible = false;

    constructor(
        private app: App,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private crudService: CRUDService){
    }

    ionViewWillEnter(){
        this.GetList();
    }

    ChangeSearchBarStatus(){
        this.isSearchBarVisible = !this.isSearchBarVisible
    }

    GetList(page?){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })

        loader.present();

        this.crudService.GetList(this.type, page)
            .subscribe(
                data => this.ItemsVO = data.accounts,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this.crudService.Logout()
                        this.app.getRootNav().setRoot(AuthPage);
                    }
                    else {
                        loader.dismiss();
                        this.Alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    for (let item of this.ItemsVO) {
                        item._avatar = "https://www.gravatar.com/avatar/" + md5(item.email.toLowerCase(), 'hex') + "?d=mm";
                    }
                    loader.dismiss();
                }
            );
    }

    DoRefresh(refresher) {
        this.GetList()

        refresher.complete();
    }

    GetItem(item) {
        this.navCtrl.push(AccountDetailsPage, {item});
    }

    AddItem() {
        this.navCtrl.push(AccountAddPage);
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
