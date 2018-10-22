import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyListingsComponent } from './moneyListings.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { RouterModule } from '@angular/router';
import { MoneyEntryComponent } from './MoneyEntry.component';
import { LoginGuard } from '../../Guards/login-guard.service.ts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        { path: '', component: MoneyListingsComponent, canActivate: [LoginGuard] },
        //{ path: 'Money', component: MoneyListingsComponent },
        //{ path: 'Money:id', component: MoneyEntryComponent }
      ])
  ],
  providers: [SharedValidatorFunctions],
  declarations: 
  [
    MoneyListingsComponent,
    MoneyEntryComponent 
  ]
})
export class MoneyModule { }