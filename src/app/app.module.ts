import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountsModule } from '../pages/accounts/accounts.module';

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth.service';
import { AuthPage } from '../pages/auth/auth'
import { ActivitiesPage } from '../pages/activities/activities';
import { AccountsService } from '../providers/accounts.service';
import { CRUDService } from '../providers/generic.crud.service';
import { Account } from '../providers/account';
import { GroupsPage } from '../pages/groups/groups';
import { CompanyPage } from '../pages/company/company';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
    declarations: [
        MyApp,
        AuthPage,
        ActivitiesPage,
        GroupsPage,
        CompanyPage,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
                platforms: {
                    ios: {
                        tabsLayout: 'icon-top',
                        tabsPlacement: 'bottom'
                    },
                    android: {
                        tabsLayout: 'title-hide',
                        tabsPlacement: 'top'
                    }
                }
            },
        ),
        AccountsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AuthPage,
        ActivitiesPage,
        GroupsPage,
        CompanyPage,
        TabsPage
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: IonicErrorHandler
        },
        Storage,
        CRUDService,
        AuthService,
        AccountsService,
        Account
    ]
})
export class AppModule {}
