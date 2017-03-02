import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AccountsListPage } from '../accounts/list-component/list.component';
import { GroupsListPage } from '../groups/list-component/list.component';
import { CompanyPage } from '../company/company';

@Component({
    selector: 'activities-home',
    templateUrl: 'activities.html'
})
export class ActivitiesPage {
    pages: Array<{title: string, component: any, icon: string, note: string}>;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController) {
            menuCtrl.enable(true)
    }

    ionViewDidLoad() {
        this.pages = [
            { title: 'Accounts', component: AccountsListPage, icon: 'person', note: '42' },
            { title: 'Groups', component: GroupsListPage, icon: 'people', note: '42' },
            { title: 'Company', component: CompanyPage, icon: 'briefcase', note: '42' }
        ];
    }

    openPage(page) {
        this.navCtrl.push(page.component);
    }

    Accounts(){
        this.navCtrl.parent.select(1);
        this.navCtrl.push(AccountsListPage);
    }

    Groups(){
        this.navCtrl.parent.select(2);
        this.navCtrl.push(GroupsListPage);
    }

    Company(){
        this.navCtrl.parent.select(3);
        this.navCtrl.push(CompanyPage);
    }

}
