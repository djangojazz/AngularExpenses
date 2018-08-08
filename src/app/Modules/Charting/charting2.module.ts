import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChartingComponent } from './Charting.component';
import { ChartingService  } from "../../Services/charting.service";

import { BrowserModule } from '@angular/platform-browser';
//import { DialogComponent } from '../../Shared/dialog.component';

import { MaterialModule } from "../material.module";
import { FlighteditComponent } from './flightedit.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [ChartingComponent,
    FlighteditComponent
],
  providers: [ChartingService]
})
export class ChartingModule { }