import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { SecurityService } from '../data/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
 
  private isloggedIn: boolean;
  private userName!:string;

  constructor(private _securityService:SecurityService ) {
      this.isloggedIn=false;
  }
  
  login(username: string, password:string):Observable<boolean> {      
    return new Observable<boolean>((observer) => {
      let user = new User();      
      user.userName = username;
      user.password = password;
      this._securityService.validateUser(user).subscribe((res)=>{
        this.isloggedIn=res;
        this.userName=username;
        observer.next(this.isloggedIn);
        observer.complete();
      });      
    });
  }

  isUserLoggedIn(): boolean {
    //return true;
    return this.isloggedIn;
  }

  isAdminUser():boolean {
      if (this.userName=='Admin') {
          return true; 
      }
      return false;
  }
  
  logoutUser(): void{
      this.isloggedIn = false;
  }

} 

