import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { StocksService } from '../services/data/stocks.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { SocketService } from '../services/socket.service';
import { PricesService } from '../services/data/prices.service';
import { AuthGuardService } from '../services/security/auth-guard.service';
import { AuthService } from '../services/security/auth.service';
import { SecurityService } from '../services/data/security.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MomentModule
  ],
  exports:[
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [ 
    StocksService,
    SocketService,
    PricesService,
    AuthGuardService,
    AuthService,
    SecurityService
  ]
})
export class SharedModule { }
