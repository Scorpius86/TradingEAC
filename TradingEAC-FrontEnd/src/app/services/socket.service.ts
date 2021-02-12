import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connection$!: WebSocketSubject<any>;
  
  constructor() { }

  connect(open=()=>{} ): Observable<any> {
    if(this.connection$){
      this.closeConnection();
    }
    this.connection$ = webSocket('wss://ws.finnhub.io?token=bvl3lrf48v6sqkpp4u9g');  
    open();
    return this.connection$;
  }

  send(data: any): void {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      //this.connection$ = null;
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }

}
