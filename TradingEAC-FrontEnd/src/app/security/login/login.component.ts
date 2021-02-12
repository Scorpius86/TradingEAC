import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
 
  form!: FormGroup;
  public loginInvalid!: boolean;
  private formSubmitAttempt!: boolean;  
  retUrl:string="/trading-manager/home";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap
            .subscribe(params => {
        this.retUrl = params.get('retUrl')??"";
    });

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isUserLoggedIn()) {
      this.router.navigate([this.retUrl]);
    }
  }

  onSubmit() {       
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      
        let username = this.form.get('username')!.value ;
        let password = this.form.get('password')!.value;

        this.authService.login(username, password).subscribe(data => {         
          if(data){
           if (this.retUrl!=null) {
             this.router.navigate( [this.retUrl]);
           } else {
                 this.router.navigate( ['/trading-manager/home']);
           }
          }else{
            this.loginInvalid = true;            
          }         
        });   
    } else {
      this.formSubmitAttempt = true;
    }
     
  }
} 
