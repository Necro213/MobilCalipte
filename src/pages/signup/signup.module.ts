import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild()
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
