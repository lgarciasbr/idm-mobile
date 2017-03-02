import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CRUDService } from '../../../providers/generic.crud.service';
import { Group } from '../../../providers/group';

import { GroupDetailsPage } from '../details-component/details.component';
import { GroupAddPage } from '../add-component/add.component';
import { AuthPage } from '../../auth/auth';

@Component({
    selector: 'page-account-list',
    templateUrl: 'list.component.html'
})
export class GroupsListPage {
    private pageTitle = 'Groups';
    private type = 'groups';
    public ItemsVO: Group[];
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
                data => this.ItemsVO = data.groups,
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
                    loader.dismiss();
                }
            );
    }

    DoRefresh(refresher) {
        this.GetList()

        refresher.complete();
    }

    GetItem(item) {
        this.navCtrl.push(GroupDetailsPage, {item});
    }

    AddItem() {
        this.navCtrl.push(GroupAddPage);
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
