import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl }          from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './login.component';
import { LoginGuard } from '../Guards/login-guard.service.ts.service';
import { AuthService } from '../Services/auth.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',   redirectTo: '/Money', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      {
        path: 'Category',
        loadChildren: '../Modules/Category/category.module#CategoryModule',
        canActivate: [LoginGuard]
      },
      {
        path: 'Money',
        loadChildren: '../Modules/Money/money.module#MoneyModule',
        //canActivate: [LoginGuard]
      },
      {
        path: 'Charting',
        loadChildren: '../Modules/Charting/charting.module#ChartingModule'
      },
      { path: '**',  component: PageNotFoundComponent },
    ]
    //, { enableTracing: true } 
    )
  ],
  exports: [ RouterModule ],
  providers: [LoginGuard, AuthService]
})
export class AppRoutingModule { 
  mode = new FormControl('over');
  events = [];
}