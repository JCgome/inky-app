import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMovement, StockMovementRequest, WeeklyStockSummary } from '../models';
import { STOCK_ENDPOINTS } from '@app/core/config/endpoints';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  register(request: StockMovementRequest): Observable<StockMovement> {
    return this.http.post<StockMovement>(STOCK_ENDPOINTS.register(), request);
  }

  getWeeklySummary(weeks = 8): Observable<WeeklyStockSummary[]> {
    const params = new HttpParams().set('weeks', weeks);
    return this.http.get<WeeklyStockSummary[]>(STOCK_ENDPOINTS.weeklySummary(), {
      params,
    });
  }
}
