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
      { path: 'login', component: LoginComponent },
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
      { path: '**',  component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ],
  providers: [LoginGuard, AuthService, AuthService]
})
export class AppRoutingModule { 
  mode = new FormControl('over');
  events = [];
}