import { NgModule } from '@angular/core';

// Material modules
import { 
  MatAutocompleteModule,
  MatButtonModule, 
  MatCardModule,
  MatSidenavModule, 
  MatDialogModule, 
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule } from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule, 
    MatCardModule,
    MatSidenavModule, 
    MatDialogModule, 
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class MaterialModule { }
