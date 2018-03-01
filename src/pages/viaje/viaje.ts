import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
//import { Toast } from 'ionic-angular/components/toast/toast';
import { BackgroundMode } from '@ionic-native/background-mode';

/**
 * Generated class for the ViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-viaje',
  templateUrl: 'viaje.html',
})
export class ViajePage {
  @ViewChild("map") mapRef: ElementRef;

  directionsService: any;
  directionsDisplay: any;
  bounds: any;
  endLocation: any;
  waypoints: any = [];
  mapa: any;
  gps: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
        private http: Http,private toastCtrl: ToastController,private backgroundGeolocation: BackgroundGeolocation,
        private backgroundMode: BackgroundMode, private zone: NgZone) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay =  new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();

  }

  ionViewDidLoad() {

    this.getCurrentPosition();

    
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.showMap(position.coords.latitude,position.coords.longitude);
    })
    .catch(error=>{
      console.log(error);
    })
  }

 

  showMap(lat,lng){
    let map: any;
    let panelEle: HTMLElement = document.getElementById('panel');
    const location = new google.maps.LatLng(lat,lng);
    //const ubicacion = new google.maps.
    const options = {
      center: location,
      zoom: 15
    }

    map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.addMarker(location,map,"Mi ubicacion");

   
    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(panelEle);

    map.addListener("click",(e)=>{
       this.addMarker(e.latLng,map,"desde click");
    });

    this.mapa = map;
    this.gps = location;
    //this.calcuateRoute(location,map);
    google.maps.event.addListenerOnce(map, "idle", () => {
      
    });
    
  }

  addMarker(pos,map,titulo){
    this.waypoints.push({
      location: pos,
      icon: "www/assets/imgs/logo.png",
      stopover:true
    });
    
    return new google.maps.Marker({
      position: pos,
      map: map,
      title: titulo
    });
  }

  calcula(){
    this.calcuateRoute(this.gps,this.mapa);
  }

  calcuateRoute(location,map){
  
    
    var request = {
      origin: location,
      destination: location,
      travelMode: 'DRIVING',
      waypoints: this.waypoints,
          optimizeWaypoints: true,
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });

  }

  iniciar1(){
  
    this.backgroundMode.enable();
    setInterval(()=>{
      this.geolocation.getCurrentPosition()
    .then(position => {
        const pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        this.addMarker(pos,this.mapa,"titulo");
        this.http.get('http://10.58.0.166:8080/pointsTravel/2',{
          params:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }).map(res => res.json()).subscribe(data => {
            console.log("Se agrego correctamente");
            this.presentToast("segundo plano correcto");
        });
    })
    .catch(error=>{
      this.presentToast(error);
    })
    
    },10000);
    
  }

  iniciar(){
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 10000
    };

    this.backgroundMode.enable();
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
      // Run update inside of Angular's zone
    }, (err) => {
      console.log(err);
    });
   
    // Turn ON the background-geolocation system
    this.backgroundGeolocation.start();

    let options = {
      frequency: 0,
      timeout: 10000,
      maximumAge:10000,
      enableHighAccuracy: true
    };
    let i = 0;
    let idviaje;
   let watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
    
    switch(i){
      case 0:
        this.http.get('http://192.168.0.14:8080/movil/app/newTravel/4',{
          params:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }).map(res => res.json()).subscribe(data => {
           idviaje = data;
        });
        i = 1;
        break;
      case 1:
        setTimeout(()=>{
          i = 2;
        },10000);
        i =3;
        break;
      case 2:
      this.zone.run(()=>{
        const pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        this.addMarker(pos,this.mapa,"titulo");
        this.presentToast(idviaje);
       this.http.get('http://192.168.0.14:8080/movil/app/travelPoints/'+idviaje,{
          params:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }).map(res => res.json()).subscribe(data => {
            
        });
        i = 1;
      });
      break;
      default: 
      //this.presentToast(i);
       break;
    }

      // Run update inside of Angular's zone
     
    });
  }

}
