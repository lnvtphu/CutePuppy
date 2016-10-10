import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, AlertController } from 'ionic-angular';
import { StatusBar, Dialogs, SQLite  } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { Database } from './providers/database/database';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Database]
})
export class MyApp {

  public rootPage: any;
  public username: any;
  constructor(private platform: Platform, private alertCtrl: AlertController, public database: Database){
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {this.checkLogin()}, 500);
      StatusBar.styleDefault();
    });
    //register back key
    // platform.registerBackButtonAction(()=>{
    // });
  }

  public checkLogin(){
    this.database.getUser().then((data) => {
      console.log(data);
      (typeof data != 'undefined') ? this.rootPage = TabsPage : this.rootPage = LoginPage;
    }, (error) => {
      console.log(error);
      this.rootPage = LoginPage;
    });
  }
}

ionicBootstrap(MyApp);
