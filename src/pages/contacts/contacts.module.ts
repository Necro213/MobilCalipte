import { NgModule, ViewContainerRef } from '@angular/core';
import { IonicPageModule, } from 'ionic-angular';
import { ContactsPage } from './contacts';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    ContactsPage
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    IonicPageModule.forChild(ContactsPage),
  ]
})
export class ContactsPageModule {}
