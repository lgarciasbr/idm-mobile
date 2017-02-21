import { Component } from '@angular/core';

import { ActivitiesPage } from '../activities/activities';
import { AccountsPage } from "../accounts/accounts-component/accounts";
import { GroupsPage } from '../groups/groups';
import { CompanyPage } from '../company/company';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ActivitiesPage;
  tab2Root: any = AccountsPage;
  tab3Root: any = GroupsPage;
  tab4Root: any = CompanyPage;

  constructor() {

  }
}
