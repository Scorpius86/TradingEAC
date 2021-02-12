import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

    
  private settingsKey = environment.localStorageKeys.apiSettings.settings;
  settings :Array<Settings> = new Array<Settings>();
  private service? = new Settings();
  private securityUrl = "";    
  
  constructor(private _httpClient: HttpClient,private _localStorageService: LocalStorageService) { }

  loadConfig(){    
    this.settings = this._localStorageService.get(this.settingsKey)??new Array<Settings>();
    this.service = this.settings.find(f=>f.nameService=="SecurityService");
    this.securityUrl = (this.service?.ActiveDotnet?this.service.urlDotnetService:this.service?.urlJavaService) +'security';    
  }

  validateUser(user: User):Observable<boolean>{    
    this.loadConfig();        
    return this._httpClient.post<boolean>(this.securityUrl,user);
  }
}
