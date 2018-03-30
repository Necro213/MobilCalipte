import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeguimientoPage } from './seguimiento';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    SeguimientoPage,
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(SeguimientoPage),
  ],
})
export class SeguimientoPageModule {}
