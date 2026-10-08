import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductRequest } from '../models';
import { PRODUCT_ENDPOINTS } from '@app/core/config/endpoints';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(includeInactive = false): Observable<Product[]> {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<Product[]>(PRODUCT_ENDPOINTS.getAll(), { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(PRODUCT_ENDPOINTS.getById(id));
  }

  createProduct(data: ProductRequest): Observable<Product> {
    return this.http.post<Product>(PRODUCT_ENDPOINTS.create(), data);
  }

  updateProduct(id: number, data: ProductRequest): Observable<Product> {
    return this.http.put<Product>(PRODUCT_ENDPOINTS.update(id), data);
  }

  /** Soft delete: el backend desactiva el libro. */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(PRODUCT_ENDPOINTS.delete(id));
  }
}
