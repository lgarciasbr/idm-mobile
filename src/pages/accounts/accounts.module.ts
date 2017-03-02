import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountsService } from '../../providers/accounts.service';
import { Account } from '../../providers/account';

import { AccountsListPage } from './list-component/list.component';
import { AccountAddPage } from './account-add/account-add';
import { AccountDetailsPage } from './account-details/account-details';

@NgModule({
    declarations: [
        AccountsListPage,
        AccountAddPage,
        AccountDetailsPage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(AccountsListPage, AccountAddPage, AccountDetailsPage)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AccountsListPage,
        AccountAddPage,
        AccountDetailsPage,
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: IonicErrorHandler
        },
        Storage,
        AccountsService,
        Account
    ]
})
export class AccountsModule {}
