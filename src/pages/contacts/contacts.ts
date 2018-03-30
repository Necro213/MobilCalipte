import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { Http } from '@angular/http';
import { SeguimientoPage } from '../seguimiento/seguimiento'

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  contactos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
                public http: Http) {
      this.http.get('http://127.0.0.1:8080/movil/app/getContacts/4'
        ).map(res => res.json()).subscribe(data => {
          this.contactos= data['data'];

          console.log(this.contactos);
        });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ContactsPage');
  }

  openModal(id) {
    
    this.navCtrl.push('SeguimientoPage',{idContact:id});
  }
}
