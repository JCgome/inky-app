import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificationData,
  NotificationToastComponent,
  NotificationType,
} from '@app/shared/components/notification-toast/notification-toast.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, params?: Record<string, unknown>): void {
    this.show('success', message, params);
  }

  error(message: string, params?: Record<string, unknown>): void {
    this.show('error', message, params, 6000);
  }

  info(message: string, params?: Record<string, unknown>): void {
    this.show('info', message, params);
  }

  private show(
    type: NotificationType,
    message: string,
    params?: Record<string, unknown>,
    duration = 4000
  ): void {
    const data: NotificationData = { type, message, params };
    this.snackBar.openFromComponent(NotificationToastComponent, {
      data,
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'app-toast-panel',
    });
  }
}
