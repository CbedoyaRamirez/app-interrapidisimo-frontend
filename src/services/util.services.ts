import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private loadingSubject = new BehaviorSubject<boolean>(false); 
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  globalLoading = false;

  constructor() { }
      
  setGlobalLoadind(load: boolean){
    this.globalLoading = load
  }
  
  getGlobalLoading() : Observable<boolean> {
    return of(this.globalLoading);
  }
  
  show() {
    this.loadingSubject.next(true);
  }

  close() {
    this.loadingSubject.next(false);
  }
}
