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
  constructor(private platform: Platform, private alertCtrl: AlertController, private database: Database){
    this.username = 'a';
    // this.creatDB();
    this.checkLogin();
    // let check = true;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    platform.registerBackButtonAction(()=>{
    });
  }

  public onPageDidEnter() {
      this.checkLogin();
  }

  public checkLogin(){
    this.database.getUser().then((data) => {
      console.log(data);
      let user = JSON.stringify(data);
      let user2 = JSON.parse(user);
      (user2.login == 0) ? this.rootPage = TabsPage : this.rootPage = LoginPage;
      // this.rootPage = TabsPage;
    }, (error) => {
      console.log(error);
      this.rootPage = LoginPage;
    });
    // let db = new SQLite();
    // db.openDatabase({
    //   name: 'data.db',
    //   location: 'default' // the location field is required
    // }).then(() => {
    //   db.executeSql('select login, avatar, level, username from user', {}).then((rs) => {
    //     console.log(rs);
    //     console.log(rs.rows.item(0));
    //     let login = rs.rows.item(0).login;
    //     this.username = rs.rows.item(0).username;
    //     (login == 0) ? this.rootPage = TabsPage : this.rootPage = LoginPage;
    //   }, (err) => {
    //     this.rootPage = LoginPage;
    //     this.creatDB();
    //     console.error('Unable to execute sql: ', err);
    //   });
    // }, (err) => {
    //   this.rootPage = LoginPage;
    //   console.error('Unable to open database: ', err);
    // });
  }
  creatDB(){
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('create table user(login int, username varchar(30) , level int, avatar varchar(255))', {}).then((rs) => {
        console.log(rs);
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
}

ionicBootstrap(MyApp);
