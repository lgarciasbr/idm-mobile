import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CRUDService } from '../providers/generic.crud.service';
import { Account } from '../providers/account';
import { Group } from '../providers/group';

import { AccountsModule } from '../pages/accounts/accounts.module';
import { GroupsModule } from '../pages/groups/groups.module';

import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/auth'
import { ActivitiesPage } from '../pages/activities/activities';
import { CompanyPage } from '../pages/company/company';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
    declarations: [
        MyApp,
        AuthPage,
        ActivitiesPage,
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
        AccountsModule,
        GroupsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AuthPage,
        ActivitiesPage,
        CompanyPage,
        TabsPage
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: IonicErrorHandler
        },
        Storage,
        CRUDService,
        Account,
        Group
    ]
})
export class AppModule {}
