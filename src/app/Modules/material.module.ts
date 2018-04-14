import { NgModule } from '@angular/core';

// Material modules
import { 
  MatButtonModule, 
  MatSidenavModule, 
  MatDialogModule, 
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule } from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule, 
    MatSidenavModule, 
    MatDialogModule, 
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule
  ],
})
export class MaterialModule { }
