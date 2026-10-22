import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, AuthorRequest, Category, CategoryRequest, Product, Publisher } from '../models';
import { AUTHOR_ENDPOINTS, CATEGORY_ENDPOINTS, PUBLISHER_ENDPOINTS } from '@app/core/config/endpoints';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(AUTHOR_ENDPOINTS.getAll());
  }

  createAuthor(data: AuthorRequest): Observable<Author> {
    return this.http.post<Author>(AUTHOR_ENDPOINTS.create(), data);
  }

  updateAuthor(id: number, data: AuthorRequest): Observable<Author> {
    return this.http.put<Author>(AUTHOR_ENDPOINTS.update(id), data);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(AUTHOR_ENDPOINTS.delete(id));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_ENDPOINTS.getAll());
  }

  getCategoryBooks(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(CATEGORY_ENDPOINTS.getBooks(id));
  }

  createCategory(data: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(CATEGORY_ENDPOINTS.create(), data);
  }

  updateCategory(id: number, data: CategoryRequest): Observable<Category> {
    return this.http.put<Category>(CATEGORY_ENDPOINTS.update(id), data);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(CATEGORY_ENDPOINTS.delete(id));
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(PUBLISHER_ENDPOINTS.getAll());
  }
}
