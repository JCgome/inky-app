import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent {
  labels = {
    heading_delete: 'replicable.heading_delete',
    title_delete: 'replicable.title_delete',
    btn_cancel: 'replicable.btn_cancel',
    btn_delete: 'replicable.btn_delete',
  };

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
