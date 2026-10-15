import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { DialogDeleteComponent } from '@app/shared/components/dialog-delete/dialog-delete.component';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  labels = {
    title: 'categories.title',
    new: 'categories.new',
    search_ph: 'categories.search_ph',
    books: 'categories.books',
    no_description: 'categories.no_description',
    empty: 'categories.empty',
    view_books: 'categories.view_books',
    edit: 'categories.edit',
    delete: 'categories.delete',
    delete_blocked: 'categories.delete_blocked',
  };

  categories: Category[] = [];
  search = '';
  loading = true;

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}

  get filtered(): Category[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.categories;
    return this.categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.catalogService.getCategories().subscribe({
      next: (c) => {
        this.categories = c;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  /** Tono estable por categoría, derivado del nombre. */
  hue(c: Category): number {
    let h = 0;
    for (const ch of c.name) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
  }

  openForm(category?: Category): void {
    this.dialog
      .open(CategoryFormComponent, {
        width: '600px',
        autoFocus: 'input',
        disableClose: true,
        data: category ?? null,
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) this.load();
      });
  }

  viewBooks(category: Category): void {
    this.dialog.open(CategoryBooksComponent, {
      width: '600px',
      autoFocus: false,
      data: category,
    });
  }

  remove(category: Category): void {
    this.dialog
      .open(DialogDeleteComponent, {
        width: '30vw',
        minWidth: '320px',
        disableClose: true,
        data: {
          heading: 'categories.delete_heading',
          message: 'categories.delete_message',
          confirm: 'categories.delete',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.catalogService
            .deleteCategory(category.id)
            .subscribe(() => this.load());
        }
      });
  }
}
