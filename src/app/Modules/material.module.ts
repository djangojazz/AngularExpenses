import { NgModule } from '@angular/core';

// Material modules
import { 
  MatAutocompleteModule,
  MatButtonModule, 
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule, 
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, 
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
    MatDatepickerModule,
    MatDialogModule, 
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule, 
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class MaterialModule { }
