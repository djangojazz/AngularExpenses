import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent }    from './Modules/Category/category.component';
import { MoneyEntryComponent }  from './Modules/MoneyEntry/moneyEntry.component';
import { ReconciliationComponent }  from './Modules/Reconciliation/reconciliation.component';
import { QueryComponent } from "./Modules/Query/query.component"
import { ChartingComponent  } from "./Modules/Charting/charting.component";
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