import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { Database } from '../../providers/database/database';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Database]
})
export class HomePage {
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private database : Database) {
console.log(navParams.get('conga'));
  }
  create() {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('create table user(username varchar(30) , pass varchar(16) )', {}).then(() => {
        console.log('create');
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  open() {
    this.database.getUser().then((data) => {
      console.log(data);
      // this.rootPage = TabsPage;
    }, (error) => {
      console.log(error);
      // this.rootPage = LoginPage;
    });
    // let db = new SQLite();
    // db.openDatabase({
    //   name: 'data.db',
    //   location: 'default' // the location field is required
    // }).then(() => {
    //   db.executeSql('select login, username from user', {}).then((rs) => {
    //     console.log(rs);
    //     console.log(rs.rows.item(0));
    //   }, (err) => {
    //     console.error('Unable to execute sql: ', err);
    //   });
    // }, (err) => {
    //   console.error('Unable to open database: ', err);
    // });
  }
  insert() {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("insert into user (login) values(0)", {}).then((rs) => {
        console.log('insert ok');
        console.log(rs);
        this.toastLogin(rs)
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  toastLogin(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }
}
