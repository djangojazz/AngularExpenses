import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartingComponent } from './charting.component';
import { ChartingService  } from "../../Services/charting.service";

import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from "../material.module";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([ { path: 'Charting', component: ChartingComponent }])
  ],
  declarations: [ChartingComponent],
  providers: [ChartingService]
})
export class ChartingModule { }