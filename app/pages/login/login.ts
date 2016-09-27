import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController, Page, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Network, SpinnerDialog } from 'ionic-native';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  private emailClass = true;
  private passClass = true;
  private focusMail = false;
  public loading = LoadingController.prototype.create({
    content: "Please wait...",
    dismissOnPageChange: true
  });
  constructor(public nav: NavController, public toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
  }
  login(email, pass) {
    if(Network.connection == 'none'){
      this.toastLogin('Please connect internet...');
      return;
    }
    if(!email || !pass){
      this.blurPass(pass);
      this.blurEmail(email);
      this.toastLogin('Please enter the field!');
      return;
    }
    let body = JSON.stringify({
			username: email,
			password: pass
		});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // var loadingLogin = this.loading();
    this.loading.present();
    this.http.put('https://mimomi.herokuapp.com/user', body, options).map(res => res.json() ).subscribe(
      data => { this.nav.push(TabsPage); },
      err => { this.loading.dismiss() ; let error = JSON.parse(err._body); this.toastLogin(error.Error);}

        // () => {this.loadingLogin().present();}
    );
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
    if (!pass) {
      return this.passClass = false;
    } else {
      return this.passClass = true;
    }
  }
  // loading(){
  //   let loading = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     dismissOnPageChange: true
  //   });
  //   return loading;
  // }
}
