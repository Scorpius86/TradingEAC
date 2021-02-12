import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingManagerRoutingModule } from './trading-manager-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TradingManagerRoutingModule.components ],
  imports: [
    CommonModule,
    SharedModule,
    TradingManagerRoutingModule
  ]
})
export class TradingManagerModule { }
