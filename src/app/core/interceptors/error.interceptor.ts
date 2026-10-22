import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const key = this.messageKey(req.method, err.status);
        if (key) this.notification.error(key);
        return throwError(() => err);
      }),
    );
  }

  private messageKey(method: string, status: number): string | null {
    if (status === 403) return 'errors.forbidden';
    if (method === 'DELETE' && status === 409) return 'errors.delete_conflict';

    const isWrite = ['POST', 'PUT', 'PATCH'].includes(method);
    if (isWrite) return null;

    if (status === 0) return 'errors.network';
    if (status >= 500) return 'errors.server';
    return null;
  }
}
