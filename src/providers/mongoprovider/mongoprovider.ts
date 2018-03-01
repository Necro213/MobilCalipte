import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MongoproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MongoproviderProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello MongoproviderProvider Provider');
  }

  getDatos(){
    return this.http.get('http://localhost:8080/pointsTravel/1')
  }
}
