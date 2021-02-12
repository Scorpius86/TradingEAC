import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ApiSettingsComponent } from './sections/api-settings/api-settings.component';
import { HomeComponent } from './sections/home/home.component';
import { StockSymbolsComponent } from './sections/stock-symbols/stock-symbols.component';
import { TradingManagerComponent } from './trading-manager.component';

const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {
    path: '', component:TradingManagerComponent,
    children: [    
      { path: 'home', component: HomeComponent },
      { path: 'stock-symbols', component: StockSymbolsComponent},
      { path: 'api-settings', component: ApiSettingsComponent},
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingManagerRoutingModule { 
  static components = [
    TradingManagerComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    StockSymbolsComponent,
    ApiSettingsComponent,
  ];
}
