import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { CompanyProfile } from 'src/app/models/company-profile';
import { Settings } from 'src/app/models/settings';
import { StockSymbol } from 'src/app/models/stock-symbol';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  
  private settingsKey = environment.localStorageKeys.apiSettings.settings;
  settings :Array<Settings> = new Array<Settings>();
  private service? = new Settings();
  private symbolsUrl = "";    
  private companyProfilesUrl = "";    
  
  constructor(private _httpClient: HttpClient,private _localStorageService: LocalStorageService) { 
    
  }

  loadConfig(){    
    this.settings = this._localStorageService.get(this.settingsKey)??new Array<Settings>();
    this.service = this.settings.find(f=>f.nameService=="StockService");
    this.symbolsUrl = (this.service?.ActiveDotnet?this.service.urlDotnetService:this.service?.urlJavaService) +'symbols';    
    this.companyProfilesUrl = (this.service?.ActiveDotnet?this.service.urlDotnetService:this.service?.urlJavaService) +'companyProfiles';    
  }

  listStocks():Observable<StockSymbol[]>{   
    this.loadConfig(); 
    return this._httpClient.get<StockSymbol[]>(this.symbolsUrl);
  }

  getCompanyProfile(symbol : string):Observable<CompanyProfile>{
    this.loadConfig();
    const path = `/${symbol}`;
    const url = `${this.companyProfilesUrl}${path}`;
    return this._httpClient.get<CompanyProfile>(url);
  }
  
  listCompanyProfiles(symbols : Array<string>):Observable<Array<CompanyProfile>>{    
    this.loadConfig();
    let params = { params: symbols.reduce((accumulator, name) => accumulator.append('symbols', name), new HttpParams())};
    return this._httpClient.get<Array<CompanyProfile>>(this.companyProfilesUrl,params);
  }
}
