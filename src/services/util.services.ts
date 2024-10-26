import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  globalLoading: boolean = false;

  constructor() { }
      
  setGlobalLoadind(load: boolean){
    this.globalLoading = load
  }
  
  getGlobalLoading() : Observable<boolean> {
    return of(this.globalLoading);
  }

}
