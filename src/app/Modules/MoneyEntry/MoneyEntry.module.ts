import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyEntryComponent } from './MoneyEntry.component';
import { FormsModule  } from "@angular/forms";
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [SharedValidatorFunctions],
  declarations: [MoneyEntryComponent]
})
export class MoneyEntryModule { }