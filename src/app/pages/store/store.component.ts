import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category, Product, StockStatus } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { ProductService } from '@app/core/services/product.service';
import { RegisterStockComponent } from '@app/shared/components/register-stock/register-stock.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ['isbn', 'title', 'stock', 'category', 'status'];
  dataSource = new MatTableDataSource<Product>([]);

  filters = {
    search: 'product.filters.search',
    search_ph: 'product.filters.search_ph',
    category: 'product.filters.category',
    all: 'product.filters.all',
    stock_status: 'product.filters.stock_status',
    clear: 'product.filters.clear',
  };
  stockStatuses: { value: StockStatus; label: string }[] = [
    { value: 'AVAILABLE', label: 'product.filters.available' },
    { value: 'LOW_STOCK', label: 'product.filters.low' },
    { value: 'OUT_OF_STOCK', label: 'product.filters.out' },
  ];
  categories: Category[] = [];
  showFilters = false;

  filterForm = this.fb.group({
    search: [''],
    categoryId: [null as number | null],
    stockStatus: [null as StockStatus | null],
  });

  totalStock = 0;
  outOfStockCount = 0;
  totalValue = 0;

  statusLabels: Record<StockStatus, string> = {
    AVAILABLE: 'product.filters.available',
    LOW_STOCK: 'product.filters.low',
    OUT_OF_STOCK: 'product.filters.out',
  };

  // La tabla se renderiza tras cargar; el paginador se engancha al aparecer.
  @ViewChild(MatPaginator) set paginator(p: MatPaginator) {
    if (p) this.dataSource.paginator = p;
  }

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private catalogService: CatalogService,
    private fb: FormBuilder,
  ) {
    this.dataSource.filterPredicate = (p) => this.matchesFilters(p);
  }

  get activeFilters(): number {
    const { search, categoryId, stockStatus } = this.filterForm.value;
    return [search?.trim(), categoryId, stockStatus].filter(Boolean).length;
  }

  ngOnInit(): void {
    this.catalogService.getCategories().subscribe((c) => (this.categories = c));
    this.loadStock();

    // Los filtros se aplican en cliente sobre la tabla.
    this.filterForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe(() => this.applyFilters());
  }

  private applyFilters(): void {
    // La cadena solo dispara el filterPredicate; los valores salen del form.
    this.dataSource.filter = String(Date.now());
    this.dataSource.paginator?.firstPage();
  }

  private matchesFilters(p: Product): boolean {
    const { search, categoryId, stockStatus } = this.filterForm.value;
    const q = search?.trim().toLowerCase();
    if (categoryId && p.category?.id !== categoryId) return false;
    if (stockStatus && p.stockStatus !== stockStatus) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.isbn.includes(q) ||
      p.authors.some((a) => a.name.toLowerCase().includes(q))
    );
  }

  clearFilters(): void {
    this.filterForm.reset({ search: '', categoryId: null, stockStatus: null });
  }

  private loadStock(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products;
        this.totalStock = products.reduce((sum, p) => sum + p.stockCurrent, 0);
        this.outOfStockCount = products.filter(
          (p) => p.stockStatus === 'OUT_OF_STOCK',
        ).length;
        this.totalValue = products.reduce(
          (sum, p) => sum + p.price * p.stockCurrent,
          0,
        );
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  statusLabel(p: Product): string {
    return this.statusLabels[p.stockStatus];
  }

  goAddRegister() {
    const dialogConfig = {
      height: 'auto',
      disableClose: true,
    };

    this.dialog
      .open(RegisterStockComponent, dialogConfig)
      .afterClosed()
      .subscribe((registered) => {
        if (registered) this.loadStock();
      });
  }
}
