import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  wayPoints: any[]=[{
    location: { lat: 21.490855, lng: -104.878304 },
    stopover: true,
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay =  new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();

  }

  ionViewDidLoad() {
    this.getCurrentPosition();
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

    this.calcuateRoute(location,map);
    google.maps.event.addListenerOnce(map, "idle", () => {
      
    });
    
  }

  addMarker(pos,map,titulo){
    return new google.maps.Marker({
      position: pos,
      map: map,
      title: titulo
    });
  }

  calcuateRoute(location,map){

    var request = {
      origin: location,
      destination: "Xalisco, Nay",
      travelMode: 'DRIVING',
      waypoints: [{
        location: "Tepic, nay",
              stopover: true
      }],
          optimizeWaypoints: true,
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });

  }

}
