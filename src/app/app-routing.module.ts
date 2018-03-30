import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent }    from './Modules/Category/Category.component';
import { MoneyEntryComponent }  from './Modules/MoneyEntry/MoneyEntry.component';
import { ReconciliationComponent }  from './Modules/Reconciliation/Reconciliation.component';
import { QueryComponent } from "./Modules/Query/Query.component"
import { ChartingComponent  } from "./Modules/Charting/Charting.component";
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
  {
    path: 'Reconciliation',
    component: ReconciliationComponent
  },
  {
    path: 'Query',
    component: QueryComponent
  },
  {
    path: 'Charting',
    component: ChartingComponent
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