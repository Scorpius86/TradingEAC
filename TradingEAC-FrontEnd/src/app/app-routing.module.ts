import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { AuthGuardService } from './services/security/auth-guard.service';

const appRoutes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: '/trading-manager/home' },
  { path: 'trading-manager', 
      loadChildren: () => import('./trading-manager/trading-manager.module').then(m => m.TradingManagerModule),
      canActivate : [AuthGuardService] 
  } ,
  { path: '**', pathMatch: 'full', redirectTo: '/trading-manager/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    LoginComponent
  ];
 }
