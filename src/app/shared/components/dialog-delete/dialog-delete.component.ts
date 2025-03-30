import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent {
  labels = {
    heading_delete: 'REPLICABLE.HEADING_DELETE',
    title_delete: 'REPLICABLE.TITLE_DELETE',
    btn_cancel: 'REPLICABLE.BTN_CANCEL',
    btn_delete: 'REPLICABLE.BTN_DELETE',
  };

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
