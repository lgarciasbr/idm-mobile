import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Group } from '../../providers/group';

import { GroupsListPage } from './list-component/list.component';
import { GroupAddPage } from './add-component/add.component';
import { GroupDetailsPage } from './details-component/details.component';

@NgModule({
    declarations: [
        GroupsListPage,
        GroupAddPage,
        GroupDetailsPage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(GroupsListPage, GroupAddPage, GroupDetailsPage)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        GroupsListPage,
        GroupAddPage,
        GroupDetailsPage,
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: IonicErrorHandler
        },
        Storage,
        Group
    ]
})
export class GroupsModule {}
