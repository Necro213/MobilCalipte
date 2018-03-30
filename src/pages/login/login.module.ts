import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild()
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule { }
