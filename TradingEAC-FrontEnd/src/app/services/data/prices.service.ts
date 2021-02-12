import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/quote';
import { Settings } from 'src/app/models/settings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  private settingsKey = environment.localStorageKeys.apiSettings.settings;
  settings : Array<Settings> = new Array<Settings>();
  private service? = new Settings();
  private pricesUrl = "";  
  
  constructor(private _httpClient: HttpClient,private _localStorageService: LocalStorageService) { }

  loadConfig(){    
    this.settings  = this._localStorageService.get(this.settingsKey)??new Array<Settings>();
    this.service = this.settings.find(f=>f.nameService=="PriceService");
    this.pricesUrl = (this.service?.ActiveDotnet?this.service.urlDotnetService:this.service?.urlJavaService) +'quotes';  
  }

  getQuote(symbol : string):Observable<Quote>{
    this.loadConfig();
    const path = `/${symbol}`;
    const url = `${this.pricesUrl}${path}`;
    return this._httpClient.get<Quote>(url);
  }
  
  listCompanyProfiles(symbols : Array<string>):Observable<Array<Quote>>{    
    this.loadConfig();
    let params = { params: symbols.reduce((accumulator, name) => accumulator.append('symbols', name), new HttpParams())};
    return this._httpClient.get<Array<Quote>>(this.pricesUrl,params);
  }
}
