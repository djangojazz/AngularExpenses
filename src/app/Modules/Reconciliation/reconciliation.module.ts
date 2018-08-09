import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconciliationComponent } from './reconciliation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: 'Reconciliation', component: ReconciliationComponent }])
  ],
  declarations: [ReconciliationComponent]
})
export class ReconciliationModule { }