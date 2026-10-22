import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Author } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { ProductService } from '@app/core/services/product.service';
import { DialogDeleteComponent } from '@app/shared/components/dialog-delete/dialog-delete.component';
import { AuthorFormComponent } from './author-form/author-form.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  labels = {
    title: 'authors.title',
    new: 'authors.new',
    search_ph: 'authors.search_ph',
    name: 'authors.name',
    books: 'authors.books',
    actions: 'authors.actions',
    empty: 'authors.empty',
    edit: 'authors.edit',
    delete: 'authors.delete',
    delete_blocked: 'authors.delete_blocked',
  };

  displayedColumns: string[] = ['name', 'books', 'actions'];
  dataSource = new MatTableDataSource<Author>([]);
  loading = true;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) {
    if (p) this.dataSource.paginator = p;
  }

  constructor(
    private catalogService: CatalogService,
    private productService: ProductService,
    private dialog: MatDialog,
  ) {
    this.dataSource.filterPredicate = (a, q) =>
      a.name.toLowerCase().includes(q);
  }

  ngOnInit(): void {
    this.load();
  }

  applySearch(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  private load(): void {
    this.loading = true;
    forkJoin({
      authors: this.catalogService.getAuthors(),
      products: this.productService.getProducts(true),
    }).subscribe({
      next: ({ authors, products }) => {
        const counts = new Map<number, number>();
        for (const p of products) {
          for (const a of p.authors ?? []) {
            counts.set(a.id, (counts.get(a.id) ?? 0) + 1);
          }
        }
        this.dataSource.data = authors.map((a) => ({
          ...a,
          bookCount: a.bookCount ?? counts.get(a.id) ?? 0,
        }));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  openForm(author?: Author): void {
    this.dialog
      .open(AuthorFormComponent, {
        width: '600px',
        autoFocus: 'input',
        disableClose: true,
        data: author ?? null,
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) this.load();
      });
  }

  remove(author: Author): void {
    this.dialog
      .open(DialogDeleteComponent, {
        width: '30vw',
        minWidth: '320px',
        disableClose: true,
        data: {
          heading: 'authors.delete_heading',
          message: 'authors.delete_message',
          confirm: 'authors.delete',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.catalogService
            .deleteAuthor(author.id)
            .subscribe(() => this.load());
        }
      });
  }
}
