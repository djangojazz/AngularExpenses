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
      { path: 'Login', component: LoginComponent },
      { path: '',   redirectTo: '/Login', pathMatch: 'full' },
      {
        path: 'Money',
        loadChildren: '../Modules/Money/money.module#MoneyModule',
        //canLoad: [LoginGuard]
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