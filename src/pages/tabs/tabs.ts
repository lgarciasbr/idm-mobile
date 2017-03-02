import { Component } from '@angular/core';

import { ActivitiesPage } from '../activities/activities';
import { AccountsListPage } from "../accounts/list-component/list.component";
import { GroupsListPage } from "../groups/list-component/list.component";
import { CompanyPage } from '../company/company';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ActivitiesPage;
  tab2Root: any = AccountsListPage;
  tab3Root: any = GroupsListPage;
  tab4Root: any = CompanyPage;

  constructor() {

  }
}
