import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { Settings } from './models/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TradingEAC';
  private settingsKey = environment.localStorageKeys.apiSettings.settings;

  settings :Array<Settings> = this._localStorageService.get(this.settingsKey)??new Array<Settings>();

  constructor(private _localStorageService: LocalStorageService){
    this.loadSettings();
  }
  loadSettings(){           
      let priceSettings = new Settings();
      priceSettings.nameService="PriceService";
      priceSettings.urlJavaService=environment.services.priceService.java;
      priceSettings.urlDotnetService=environment.services.priceService.dotnet;
      priceSettings.ActiveDotnet=this.settings.find(f=>f.nameService=="PriceService")?.ActiveDotnet||false;

      let stockSettings = new Settings();
      stockSettings.nameService="StockService";
      stockSettings.urlJavaService=environment.services.stockService.java;
      stockSettings.urlDotnetService=environment.services.stockService.dotnet;
      stockSettings.ActiveDotnet=this.settings.find(f=>f.nameService=="StockService")?.ActiveDotnet||false;

      let securitySettings = new Settings();
      securitySettings.nameService="SecurityService";
      securitySettings.urlJavaService=environment.services.securityService.java;
      securitySettings.urlDotnetService=environment.services.securityService.dotnet;
      securitySettings.ActiveDotnet=this.settings.find(f=>f.nameService=="SecurityService")?.ActiveDotnet||false;
      
      this.settings=new Array<Settings>();
      this.settings.push(priceSettings);
      this.settings.push(stockSettings);
      this.settings.push(securitySettings);

      this._localStorageService.set(this.settingsKey,this.settings);

  }
}
