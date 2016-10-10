import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
  public username: any;
  public avatar: any;
  constructor(public navCtrl: NavController) {
  }
  logout(){
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('drop table user', {}).then((rs) => {
        this.navCtrl.push(LoginPage);
        console.log(rs);
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
}
