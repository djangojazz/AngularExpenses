import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyEntryComponent } from './MoneyEntry.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MoneyEntryComponent]
})
export class MoneyEntryModule { }