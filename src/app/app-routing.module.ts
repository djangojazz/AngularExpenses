import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent }    from './Category/Category.component';
import { MoneyEntryComponent }  from './MoneyEntry/MoneyEntry.component';
import { FormControl }          from '@angular/forms';

const appRoutes: Routes = [

  {
    path: 'Category',
    component: CategoryComponent
  },
  {
    path: 'MoneyEntry',
    component: MoneyEntryComponent
  },
  { path: '',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { 
  mode = new FormControl('over');
  events = [];
}