import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product, StockStatus } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { ProductService } from '@app/core/services/product.service';
import { ROUTES } from '@app/shared/constants/route-constants';
import { DialogDeleteComponent } from '@app/shared/components/dialog-delete/dialog-delete.component';
import { DetailsModalComponent } from '@app/shared/components/details-modal/details-modal.component';
import { RegisterStockComponent } from '@app/shared/components/register-stock/register-stock.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  labels = {
    product: 'product.products',
    isbn: 'product.code',
    title_book: 'product.name',
    stock: 'product.stock',
    category: 'product.category',
    add_product: 'product.add',
    add_register: 'product.register',
    title_products: 'product.management_products.title_products',
    title_books: 'product.management_products.title',
    author: 'product.management_products.author',
    gender: 'product.management_products.gender',
    year_publish: 'product.management_products.year_publish',
    price: 'product.management_products.price',
    number_pag: 'product.management_products.number_pag',
    format: 'product.management_products.format',
    language: 'product.management_products.language',
    publisher: 'product.management_products.publisher',
    provider: 'product.management_products.provider',
    image_product: 'product.management_products.image_product',
    select_image: 'product.management_products.select_image',
    select_file: 'product.management_products.select_file',
    btn_cancel: 'replicable.btn_cancel',
    btn_save: 'replicable.btn_save',
  };
  filters = {
    search: 'product.filters.search',
    search_ph: 'product.filters.search_ph',
    category: 'product.filters.category',
    all: 'product.filters.all',
    stock_status: 'product.filters.stock_status',
    include_inactive: 'product.filters.include_inactive',
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
    includeInactive: [false],
  });

  displayedColumns = ['isbn', 'title', 'stock', 'gender', 'actions'];

  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private catalogService: CatalogService
  ) {
    this.dataSource.filterPredicate = (p) => this.matchesFilters(p);
  }

  get activeFilters(): number {
    const { search, categoryId, stockStatus, includeInactive } =
      this.filterForm.value;
    return [search?.trim(), categoryId, stockStatus, includeInactive].filter(
      Boolean
    ).length;
  }

  ngOnInit() {
    this.catalogService.getCategories().subscribe((c) => (this.categories = c));
    this.loadProducts();

    // Los filtros se aplican en cliente; includeInactive recarga desde el back.
    let includeInactive = false;
    this.filterForm.valueChanges.pipe(debounceTime(250)).subscribe((v) => {
      if (!!v.includeInactive !== includeInactive) {
        includeInactive = !!v.includeInactive;
        this.loadProducts();
      }
      this.applyFilters();
    });
  }

  private loadProducts(): void {
    this.productService
      .getProducts(!!this.filterForm.value.includeInactive)
      .subscribe((productos) => (this.dataSource.data = productos));
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
    this.filterForm.reset({
      search: '',
      categoryId: null,
      stockStatus: null,
      includeInactive: false,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goAddProducts() {
    this.router.navigate(['add-products'], { relativeTo: this.route });
  }

  goAddRegister() {
    const dialogConfig = {
      with: 'auto',
      height: 'auto',
      disableClose: true,
    };

    this.dialog
      .open(RegisterStockComponent, dialogConfig)
      .afterClosed()
      .subscribe((registered) => {
        if (registered) this.loadProducts();
      });
  }

  goeditProducts(id: number) {
    this.router.navigate([
      ROUTES.dashboard,
      ROUTES.products,
      ROUTES.add_products,
      id,
    ]);
  }

  goViewProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.dialog.open(DetailsModalComponent, {
        width: '50vw',
        height: '60vh',
        autoFocus: false,
        disableClose: true,
        data: {
          data: {
            ...product,
            author: product.authors.map((a) => a.name).join(', '),
            gender: product.category?.name,
            publisher: product.publisher?.name,
            provider: product.providerName,
            stock: product.stockCurrent,
            year_publish: product.yearPublished,
            number_pag: product.pages,
            image: product.imageUrl,
          },
          fields: [
            { label: this.labels.isbn, key: 'isbn' },
            { label: this.labels.stock, key: 'stock' },
            { label: this.labels.gender, key: 'gender' },
            { label: this.labels.price, key: 'price' },
            { label: this.labels.year_publish, key: 'year_publish' },
            { label: this.labels.number_pag, key: 'number_pag' },
            { label: this.labels.format, key: 'format' },
            { label: this.labels.language, key: 'language' },
            { label: this.labels.publisher, key: 'publisher' },
            { label: this.labels.provider, key: 'provider' },
          ],
          headerTitleKey: 'title',
          headerSubtitleKey: 'author',
          imageKey: 'image',
        },
      });
    });
  }

  goDeleteProduct(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '30vw',
      height: '45vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}
