import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChartingComponent } from './Charting.component';
import { ChartingService  } from "../../Services/charting.service";

import { BrowserModule } from '@angular/platform-browser';
//import { DialogComponent } from '../../Shared/dialog.component';

import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  //entryComponents: [DialogComponent],
  declarations: [ChartingComponent],
  providers: [ChartingService]
})
export class ChartingModule { }