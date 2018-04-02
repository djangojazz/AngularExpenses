import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyEntryComponent } from './MoneyEntry.component';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule
  ],
  declarations: [MoneyEntryComponent]
})
export class MoneyEntryModule { }