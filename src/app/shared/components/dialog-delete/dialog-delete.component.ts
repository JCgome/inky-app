import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogDeleteData {
  heading?: string;
  message?: string;
  confirm?: string;
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent {
  labels = {
    heading_delete: this.data?.heading ?? 'replicable.heading_delete',
    title_delete: this.data?.message ?? 'replicable.title_delete',
    btn_cancel: 'replicable.btn_cancel',
    btn_delete: this.data?.confirm ?? 'replicable.btn_delete',
  };

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: DialogDeleteData | null
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
