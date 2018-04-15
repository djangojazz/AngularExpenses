import { NgModule } from '@angular/core';

// Material modules
import { 
  MatButtonModule, 
  MatSidenavModule, 
  MatDialogModule, 
  MatExpansionModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule } from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule, 
    MatSidenavModule, 
    MatDialogModule, 
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class MaterialModule { }
