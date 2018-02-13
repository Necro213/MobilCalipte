import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViajePage } from './viaje';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    ViajePage,
  ],
  imports: [
    IonicPageModule.forChild(ViajePage),
  ],
  providers:[
    Geolocation,
  ]
})
export class ViajePageModule {}
