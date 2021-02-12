import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Settings } from 'src/app/models/settings';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-settings',
  templateUrl: './api-settings.component.html',
  styleUrls: ['./api-settings.component.scss']
})
export class ApiSettingsComponent implements OnInit {

  isPriceServiceDotnet? = false;
  isStockServiceDotnet? = false;
  isSecurityServiceDotnet? = false;

  private settingsKey = environment.localStorageKeys.apiSettings.settings;

  settings :Array<Settings> = this._localStorageService.get(this.settingsKey)??new Array<Settings>();

  constructor(private _localStorageService: LocalStorageService) { }

  ngOnInit(): void {
   this.loadSettings(); 
  }

  loadSettings(){
    if(this.settings.length == 0){      
      let priceSettings = new Settings();
      priceSettings.nameService="PriceService";
      priceSettings.urlJavaService=environment.services.priceService.java;
      priceSettings.urlDotnetService=environment.services.priceService.dotnet;
      priceSettings.ActiveDotnet=false;

      let stockSettings = new Settings();
      stockSettings.nameService="StockService";
      stockSettings.urlJavaService=environment.services.stockService.java;
      stockSettings.urlDotnetService=environment.services.stockService.dotnet;
      stockSettings.ActiveDotnet=false;

      let securitySettings = new Settings();
      securitySettings.nameService="SecurityService";
      securitySettings.urlJavaService=environment.services.securityService.java;
      securitySettings.urlDotnetService=environment.services.securityService.dotnet;
      securitySettings.ActiveDotnet=false;

      this.settings.push(priceSettings);
      this.settings.push(stockSettings);
      this.settings.push(securitySettings);

      this._localStorageService.set(this.settingsKey,this.settings);
    }

    this.isPriceServiceDotnet = this.settings.find(f=>f.nameService=="PriceService")?.ActiveDotnet;
    this.isStockServiceDotnet = this.settings.find(f=>f.nameService=="StockService")?.ActiveDotnet;
    this.isSecurityServiceDotnet = this.settings.find(f=>f.nameService=="SecurityService")?.ActiveDotnet;
  }

  changeSetting(e:any){
    this.settings.forEach(s=>{
      if(s.nameService==e.service){
        s.ActiveDotnet=e.e.checked;
      }
    });
    
    this._localStorageService.set(this.settingsKey,this.settings);
  }
}
