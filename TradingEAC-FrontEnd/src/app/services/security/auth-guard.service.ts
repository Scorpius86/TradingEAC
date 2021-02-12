import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router,private authService: AuthService ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {

    if (!this.authService.isUserLoggedIn()) {      
      this._router.navigate(["login"],{ queryParams: { retUrl: route.url} });
      return false;
    }    
    return true;    
  }
}