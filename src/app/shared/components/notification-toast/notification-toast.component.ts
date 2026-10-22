import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationData {
  type: NotificationType;
  /** i18n key */
  message: string;
  params?: Record<string, unknown>;
}

const ICONS: Record<NotificationType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
};

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.scss'],
})
export class NotificationToastComponent {
  icon = ICONS[this.data.type];

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private ref: MatSnackBarRef<NotificationToastComponent>
  ) {}

  close(): void {
    this.ref.dismiss();
  }
}
