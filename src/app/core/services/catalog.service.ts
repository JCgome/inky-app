import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Category, Publisher } from '../models';
import { AUTHOR_ENDPOINTS, CATEGORY_ENDPOINTS, PUBLISHER_ENDPOINTS } from '@app/core/config/endpoints';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(AUTHOR_ENDPOINTS.getAll());
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_ENDPOINTS.getAll());
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(PUBLISHER_ENDPOINTS.getAll());
  }
}
