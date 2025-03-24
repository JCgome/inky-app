import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/product.model';
import { DEFAULT_PRODUCTS } from '../models/mock-products.data';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  private products: Producto[] = [...DEFAULT_PRODUCTS];

  getProducts(): Observable<Producto[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Producto | undefined> {
    return of(this.products.find((p) => p.id === id));
  }

  createProduct(data: Omit<Producto, 'id'>): Observable<Producto> {
    const newId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
    const newProduct: Producto = { id: newId, ...data };
    this.products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(
    id: number,
    data: Partial<Producto>
  ): Observable<Producto | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...data };
      return of(this.products[index]);
    }
    return of(null);
  }

  deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return of(true);
  }
}
