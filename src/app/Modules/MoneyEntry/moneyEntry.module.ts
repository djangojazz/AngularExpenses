import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyEntryComponent } from './moneyEntry.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([ { path: 'MoneyEntry', component: MoneyEntryComponent }])
  ],
  providers: [SharedValidatorFunctions],
  declarations: [MoneyEntryComponent]
})
export class MoneyEntryModule { }