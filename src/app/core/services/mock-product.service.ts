// src/app/services/mock-product.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  private productos: Producto[] = [];
  private currentId = 1;
  private readonly STORAGE_KEY = 'productos_mock';

  private guardarEnStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productos));
  }
  listarProductos(): Observable<Producto[]> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.productos = data ? JSON.parse(data) : [];
    return of(this.productos);
  }

  crearProducto(data: Omit<Producto, 'id'>): Observable<Producto> {
    const nuevo: Producto = {
      id: this.currentId++,
      ...data,
    };
    this.productos.push(nuevo);
    this.guardarEnStorage();
    return of(nuevo);
  }

  obtenerProducto(id: number): Observable<Producto | undefined> {
    return of(this.productos.find((p) => p.id === id));
  }

  actualizarProducto(
    id: number,
    data: Partial<Producto>
  ): Observable<Producto | null> {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...data };
      this.guardarEnStorage();
      return of(this.productos[index]);
    }
    return of(null);
  }

  eliminarProducto(id: number): Observable<boolean> {
    this.productos = this.productos.filter((p) => p.id !== id);
    this.guardarEnStorage();
    return of(true);
  }
}
