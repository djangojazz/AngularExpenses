import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl }          from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
      { path: '**',  component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { 
  mode = new FormControl('over');
  events = [];
}