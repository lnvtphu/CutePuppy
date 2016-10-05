import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, AlertController } from 'ionic-angular';
import { StatusBar, Dialogs, SQLite  } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;
  constructor(private platform: Platform, private alertCtrl: AlertController){
    this.checkLogin();
    let check = true;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    platform.registerBackButtonAction(()=>{
    });
  }
  checkLogin(){
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('select login from user', {}).then((rs) => {
        console.log(rs);
        console.log(rs.rws.item(0));
        (rs.rows.item(0) == 'undefined') && db.executeSql('create table user(login smallint, username varchar(30) , pass varchar(16) ', {}).then((rs) => {
          console.log(rs);
        });
        (rs.rows.item(0) == 0) ? this.rootPage = TabsPage : this.rootPage = LoginPage;
      }, (err) => {
        this.rootPage = LoginPage;
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      this.rootPage = LoginPage;
      console.error('Unable to open database: ', err);
    });
  }
}

ionicBootstrap(MyApp);
