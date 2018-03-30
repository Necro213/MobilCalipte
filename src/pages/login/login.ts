import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { tel: string, password: string } = {
    tel: '1111111111',
    password: 'test'
  };

  // Our translated text strings


  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public http: Http,private storage: Storage) {
      
  }

  // Attempt to login in through our User service
  doLogin() {
    this.http.get('http://192.168.0.31:8080/movil/app/login',{
      params:{
        usuario: this.account.tel,
        pass: this.account.password
      }
    })
      .map(res => res.json()).subscribe(response => {
        if(response["code"]==200){
          this.storage.set("id", response["data"]["id"]);
          this.navCtrl.push(MainPage);
        }else{
          let toast = this.toastCtrl.create({
            message: response["data"],
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });
  }
}
