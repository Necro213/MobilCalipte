import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViajePage } from './viaje';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
@NgModule({
  declarations: [
    ViajePage,
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(ViajePage),
  ],
  providers:[
    BackgroundGeolocation,
    Geolocation,
    BackgroundMode
  ]
})
export class ViajePageModule {}
