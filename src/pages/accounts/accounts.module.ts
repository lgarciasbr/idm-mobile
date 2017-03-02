import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Account } from '../../providers/account';

import { AccountsListPage } from './list-component/list.component';
import { AccountAddPage } from './add-component/add.component';
import { AccountDetailsPage } from './details-component/details.component';

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
        Account
    ]
})
export class AccountsModule {}
