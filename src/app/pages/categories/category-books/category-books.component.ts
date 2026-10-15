import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Product } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';

@Component({
  selector: 'app-category-books',
  templateUrl: './category-books.component.html',
  styleUrls: ['./category-books.component.scss'],
})
export class CategoryBooksComponent implements OnInit {
  books: Product[] = [];

  constructor(
    private catalogService: CatalogService,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {}

  ngOnInit(): void {
    this.catalogService
      .getCategoryBooks(this.category.id)
      .subscribe((b) => (this.books = b));
  }
}
