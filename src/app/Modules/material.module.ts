import { NgModule } from '@angular/core';

// Material modules
import { 
  MatButtonModule, 
  MatSidenavModule, 
  MatDialogModule, 
  MatSnackBarModule,
  MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule, 
    MatSidenavModule, 
    MatDialogModule, 
    MatSnackBarModule,
    MatToolbarModule
  ],
})
export class MaterialModule { }
