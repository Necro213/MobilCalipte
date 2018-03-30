import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the SeguimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-seguimiento',
  templateUrl: 'seguimiento.html',
})
export class SeguimientoPage {
  @ViewChild("map") mapRef: ElementRef;
  mapa: any;
  directionsService: any;
  directionsDisplay: any;
  bounds: any;
  lats: any = [];
  lngs: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
                public http: Http) {
   /* this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay =  new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();*/
  }

  ionViewDidLoad() {
    this.http.get('http://127.0.0.1:8080/movil/app/InformacionContato/'+this.navParams.get("idContact"),{
      params:{
        idContact:4
      }
    }).map(res => res.json()).subscribe(data => {
          this.showMap(data['lat_inicio'],data['lng_inicio']);
          this.http.get('http://127.0.0.1:8080/movil/app/pointsContact/'+data['id']
        ).map(res => res.json()).subscribe(info => {
            this.lats= info[0]['coords']['lat'];
            this.lngs = info[0]['coords']['lng'];
            for(let i = 0; i<this.lats.length; i++){
              const location = new google.maps.LatLng(this.lats[i],this.lngs[i]);
              this.addMarker(location,this.mapa);
            }
        });
    });

    setInterval(this.reloadPosition(),20000);
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  reloadPosition(){
    this.http.get('http://127.0.0.1:8080/movil/app/InformacionContatoo/'+this.navParams.get("idContact"),{
      params:{
        idContact:4
      }
    }).map(res => res.json()).subscribe(data => {
          this.showMap(data['lat_inicio'],data['lng_inicio']);
          this.http.get('http://127.0.0.1:8080/movil/app/pointsContact/'+data['id']
        ).map(res => res.json()).subscribe(info => {
            let newLats= info[0]['coords']['lat'];
            let newLngs = info[0]['coords']['lng'];
            
            for(let i = this.lats.length; i<newLats.length; i++){
              const location = new google.maps.LatLng(this.lats[i],this.lngs[i]);
              this.addMarker(location,this.mapa);
            }

            this.lats=newLats;
            this.lngs=newLngs;
        });
    });
  }

  showMap(lat,lng){
    let map: any;
    let panelEle: HTMLElement = document.getElementById('panel');
    const location = new google.maps.LatLng(lat,lng);

    const options = {
      center: location,
      zoom: 16
    }

    map = new google.maps.Map(this.mapRef.nativeElement, options);

    //this.addMarker(location,map,"Mi ubicacion");

   
    //this.directionsDisplay.setMap(map);
    //this.directionsDisplay.setPanel(panelEle);

    this.mapa = map;
    //this.gps = location;
    //this.calcuateRoute(location,map);
  }

  addMarker(pos,map){
    return new google.maps.Marker({
      position: pos,
      map: map,
      icon:{
        url: 'https://pbs.twimg.com/profile_images/886994654066991105/LKaqvuJF_reasonably_small.jpg'
      }
    });
  }

}
