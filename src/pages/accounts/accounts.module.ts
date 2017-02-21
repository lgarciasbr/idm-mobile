import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountsService } from '../../providers/accounts.service';
import { AccountsPage } from './accounts-component/accounts';
import { AccountAddPage } from './account-add/account-add';
import { AccountDetailsPage } from './account-details/account-details';
import { Account } from '../../providers/account';

@NgModule({
    declarations: [
        AccountsPage,
        AccountAddPage,
        AccountDetailsPage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(AccountsPage, AccountAddPage, AccountDetailsPage)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AccountsPage,
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
