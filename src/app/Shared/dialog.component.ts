import { Component, Inject } from '@angular/core';
import { DialogModel  } from "../Models/dialogModel";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-newcategorydialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
