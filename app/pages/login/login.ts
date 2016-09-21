import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
   @ViewChild('cuteNav') nav : NavController;
  private emailClass: any;
  private passClass: any;

  constructor(public toastCtrl: ToastController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.emailClass = true;
    this.passClass = true;
  }
  login(email, pass) {
    return TabsPage;
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
}
