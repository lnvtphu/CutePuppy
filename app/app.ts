import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar, Dialogs, SQLite  } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform){
    this.checkLogin();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  checkLogin(){
    let check = true;
    if(check){
      this.rootPage = TabsPage;
    }else {
      this.rootPage = LoginPage;
    }
  }
}

ionicBootstrap(MyApp);
