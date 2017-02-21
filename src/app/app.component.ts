import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Config } from 'ionic-angular';

import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    private app: App,
    private platform: Platform,
    private _auth: AuthService,
    private storage: Storage,
    private config: Config
  ){
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      // { title: 'About', component: AboutPage, icon: 'information-circle' }
    ];

    this.storage.get('idM-token').then((token) => {
      if (token){
        this.config.set('idM-token', token);
        this.rootPage = TabsPage;
      }
      else
        this.rootPage = AuthPage;
    })
  }

  OpenPage(page) {
    this.nav.setRoot(page.component);
  }

  Logout(){
    this._auth.Logout();
    this.app.getRootNav().setRoot(AuthPage);
  }

}
