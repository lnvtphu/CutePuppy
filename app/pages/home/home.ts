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
  toastLogin(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }
}
