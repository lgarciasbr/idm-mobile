import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import md5 from 'crypto-md5';
import 'rxjs/add/operator/map';

import { CRUDService } from '../../../providers/generic.crud.service';
import { Account } from '../../../providers/account';

import { AccountDetailsPage } from '../details-component/details.component';
import { AccountAddPage } from '../add-component/add.component';
import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-list',
    templateUrl: 'list.component.html'
})
export class AccountsListPage {
    private pageTitle = 'Accounts';
    private type = 'accounts';
    public ItemsVO: Account[];
    public isSearchBarVisible = false;
    private value = '';

    constructor(
        private app: App,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingController: LoadingController,
        private crudService: CRUDService){
    }

    ionViewWillEnter(){
        this.SearchItem();
    }

    ChangeSearchBarStatus(){
        this.isSearchBarVisible = !this.isSearchBarVisible
    }

    onInput(event: KeyboardEvent) {
        this.value = (<HTMLInputElement>event.target).value

        if (this.value != null && (this.value.length == 0 || this.value.length >= 3)) {
            this.SearchItem();
        }
        else if (this.value == null){
            this.value = '';
            this.SearchItem();
        }
    }

    SearchItem(page?){
        let loader = this.loadingController.create({
            content: "Please wait",
            spinner: "crescent"
        })

        loader.present();

        this.crudService.SearchItem(this.type, this.value, page)
            .subscribe(
                data => this.ItemsVO = data.accounts,
                response => {
                    if (response.status == 403) {
                        loader.dismiss();
                        this.crudService.Logout();
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
                        this.crudService.Logout();
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
        this.SearchItem();

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
