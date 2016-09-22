import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SQLite } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }
  create() {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('create table danceMoves(name varchar(20))', {}).then(() => {
        this.toastLogin('create oke');
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  open() {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('select * from danceMoves', {}).then((rs) => {
        this.toastLogin(rs.rows.item(0));
        console.log(rs.rows.item(0));
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  insert() {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("insert into danceMoves values('conheo')", {}).then((rs) => {
        console.log('insert ok');
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
  cmdSQLite(cmd){
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql(cmd, {}).then((rs) => {
        return rs;
      }, (err) => {
        return 'errexeccmd';
      });
    }, (err) => {
      return 'erropendata';
    });
  }
}
