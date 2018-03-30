import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { nombre: string, ap_pat: string, ap_mat: string,estado: number,municipio: number,colonia: number,
            calle: string,numero: number, cp: number, correo: string, tel_cel: number, tel_fij: number, 
            fecha: string,usuario:string,pass:string} = {
    nombre: '',
    ap_pat: '',
    ap_mat: '',
    estado: 0,
    municipio: 0,
    colonia: 0,
    calle: "",
    numero: 0,
    cp: 0,
    correo: '',
    tel_cel: 0,
    tel_fij: 0,
    fecha: '',
    usuario: '',
    pass: ''
  };

  estados: any = [];
  municipios: any = [];
  colonias: any = [];
  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public http: Http) {

      this.http.get('http://192.168.0.31:8080/getEstados')
        .map(res => res.json()).subscribe(response => {
          if(response["code"]==200){
            let est = response["msg"];
           est.forEach(element => {
             this.estados.push(element);
           });
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

  getMunicipios(selectedValue: any){
    this.account.estado = selectedValue;
    this.municipios= [];
    this.http.get('http://192.168.0.31:8080//getCiudades/'+selectedValue)
        .map(res => res.json()).subscribe(response => {
          if(response["code"]==200){
            let est = response["msg"];
           est.forEach(element => {
             this.municipios.push(element);
           });
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

  getColonias(selectedValue: any){
    this.account.municipio = selectedValue;
    this.colonias= [];
    this.http.get('http://192.168.0.31:8080/getLocalidades/'+selectedValue)
        .map(res => res.json()).subscribe(response => {
          if(response["code"]==200){
            let est = response["msg"];
           est.forEach(element => {
             this.colonias.push(element);
           });
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

  selColonia(selectedValue: any){
    this.account.colonia = selectedValue;
  }

  registrar() {
    this.http.put('http://192.168.0.31:8080/movil/app/signup',{
      params:this.account
    })
        .map(res => res.json()).subscribe(response => {
          if(response['code']==200){
            let toast = this.toastCtrl.create({
              message: response["msg"],
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            
          }
        });
  }
}
