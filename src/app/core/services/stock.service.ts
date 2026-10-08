import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMovement, StockMovementRequest } from '../models';
import { STOCK_ENDPOINTS } from '@app/core/config/endpoints';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  register(request: StockMovementRequest): Observable<StockMovement> {
    return this.http.post<StockMovement>(STOCK_ENDPOINTS.register(), request);
  }
}
