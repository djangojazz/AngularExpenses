import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyEntryComponent } from './MoneyEntry.component';
import { FormsModule  } from "@angular/forms";
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [MoneyEntryComponent]
})
export class MoneyEntryModule { }