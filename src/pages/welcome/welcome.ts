import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../pages';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public storage: Storage, viewCtrl: ViewController) { 
    this.storage.get('id').then((val) => {
      if(val != null){
        this.navCtrl.push(MainPage);
        viewCtrl.dismiss();
      }
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
