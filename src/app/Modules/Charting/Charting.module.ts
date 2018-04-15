import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChartingComponent } from './Charting.component';
import { ChartingService  } from "../../Services/charting.service";
import { MatButtonModule,  
  MatInputModule, 
  MatDialogModule, 
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
//import { DialogComponent } from '../../Shared/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  //entryComponents: [DialogComponent],
  declarations: [ChartingComponent],
  providers: [ChartingService]
})
export class ChartingModule { }