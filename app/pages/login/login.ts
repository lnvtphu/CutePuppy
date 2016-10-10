import { Component, ViewChild,  } from '@angular/core';
import { ToastController, NavController, Page, LoadingController, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Network, SpinnerDialog, SQLite } from 'ionic-native';
import { Database } from '../../providers/database/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Database]
})
export class LoginPage {
  private emailClass = true;
  private passClass = true;
  private focusMail = false;
  constructor(public nav: NavController, public toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, private database: Database, private viewCtrl: ViewController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
  }
  ionViewWillEnter() {
    console.log("login");
    this.viewCtrl.showBackButton(false);
  }

  login(email, pass) {
    if(Network.connection == 'none'){
      this.toastLogin('Please connect internet...');
    }else if(!email || !pass){
      this.blurPass(pass);
      this.blurEmail(email);
      this.toastLogin('Please enter the field!');
    } else if(this.blurEmail(email)){
      let body = JSON.stringify({
  			username: email,
  			password: pass
  		});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var loadingLogin = this.loading();
      loadingLogin.present();
      this.http.post('https://mimomi.herokuapp.com/user', body, options).map(res => res.json() ).subscribe(
        data => {
          console.log(data);
          this.database.registerUser(data.username, data.level, data.avatar).then((data) => {
            console.log(data);
          }, (error) => {
            console.log(error);
          });

          this.nav.push(TabsPage, data);
        },
        err => {  setTimeout(() => { loadingLogin.dismiss(); }, 1); let error = JSON.parse(err._body); this.toastLogin(error.Error);}
      );
    }
  }
  toastLogin(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }
  blurEmail(email) {
    let mailcheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return this.emailClass = false;
    } else if (!mailcheck.test(email)) {
      this.toastLogin('Email invalid!');
      return this.emailClass = false;
    }
    return this.emailClass = true;
  }
  blurPass(pass) {
    let result;
    (pass) ? result = true : result = false;
    return result;
  }
  loading(){
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    return loading;
  }
}
