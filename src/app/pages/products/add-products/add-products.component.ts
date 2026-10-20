import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@app/shared/constants/route-constants';
import {
  Author,
  BookFromIsbnRequest,
  Category,
  Product,
  ProductRequest,
  Publisher,
} from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { NotificationService } from '@app/core/services/notification.service';
import { ProductService } from '@app/core/services/product.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  isbnForm: FormGroup = this.fb.group({});
  tabLabels = {
    manual: 'product.add_tabs.manual',
    by_isbn: 'product.add_tabs.by_isbn',
    isbn_hint: 'product.add_tabs.isbn_hint',
  };
  authors: Author[] = [];
  categories: Category[] = [];
  publishers: Publisher[] = [];
  formats = ['Tapa dura', 'Tapa blanda', 'Ebook'];
  isEditMode = false;
  editingProductId: number | null = null;

  labels = {
    title_products: 'product.management_products.title_products',
    title_books: 'product.management_products.title',
    author: 'product.management_products.author',
    isbn: 'product.management_products.id',
    gender: 'product.management_products.gender',
    year_publish: 'product.management_products.year_publish',
    price: 'product.management_products.price',
    number_pag: 'product.management_products.number_pag',
    format: 'product.management_products.format',
    language: 'product.management_products.language',
    publisher: 'product.management_products.publisher',
    provider: 'product.management_products.provider',
    image_product: 'product.management_products.image_product',
    btn_cancel: 'replicable.btn_cancel',
    btn_save: 'replicable.btn_save',
    title_edit: 'replicable.title_edit',
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      authorIds: [[] as number[], Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      categoryId: [null as number | null],
      yearPublished: [null as number | null, [Validators.min(1000), Validators.max(2100)]],
      price: [null as number | null, [Validators.required, Validators.min(0)]],
      pages: [null as number | null, Validators.min(1)],
      format: [''],
      language: [''],
      publisherId: [null as number | null],
      providerName: [''],
      imageUrl: [''],
    });

    this.isbnForm = this.fb.group({
      isbn: ['', [Validators.required, isbn13Validator]],
      categoryId: [null as number | null],
      price: [null as number | null, [Validators.required, Validators.min(0)]],
      format: [''],
      language: [''],
      providerName: [''],
    });

    this.catalogService.getAuthors().subscribe((a) => (this.authors = a));
    this.catalogService.getCategories().subscribe((c) => (this.categories = c));
    this.catalogService.getPublishers().subscribe((p) => (this.publishers = p));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProductToEdit(+id);
    }
  }

  loadProductToEdit(id: number) {
    this.isEditMode = true;
    this.editingProductId = id;

    this.productService.getProductById(id).subscribe((product) => {
      this.form.patchValue(this.toFormValue(product));
    });
  }

  goCancel() {
    this.router.navigate([ROUTES.dashboard, ROUTES.products]);
  }

  guardarProducto() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = this.toRequest();
    const request$ =
      this.isEditMode && this.editingProductId !== null
        ? this.productService.updateProduct(this.editingProductId, product)
        : this.productService.createProduct(product);

    request$.subscribe({
      next: () => {
        this.notification.success(
          this.isEditMode
            ? 'notifications.product_updated'
            : 'notifications.product_created'
        );
        this.goCancel();
      },
      error: () => this.notification.error('notifications.product_error'),
    });
  }

  guardarPorIsbn() {
    if (this.isbnForm.invalid) {
      this.isbnForm.markAllAsTouched();
      return;
    }

    const v = this.isbnForm.value;
    const request: BookFromIsbnRequest = {
      isbn: v.isbn,
      categoryId: v.categoryId ?? undefined,
      price: v.price,
      format: v.format || undefined,
      language: v.language || undefined,
      providerName: v.providerName || undefined,
    };

    this.productService.createFromIsbn(request).subscribe({
      next: () => {
        this.notification.success('notifications.product_created');
        this.goCancel();
      },
      error: () => this.notification.error('notifications.product_isbn_error'),
    });
  }

  private toFormValue(product: Product) {
    return {
      title: product.title,
      authorIds: product.authors.map((a) => a.id),
      isbn: product.isbn,
      categoryId: product.category?.id ?? null,
      yearPublished: product.yearPublished ?? null,
      price: product.price,
      pages: product.pages ?? null,
      format: product.format ?? '',
      language: product.language ?? '',
      publisherId: product.publisher?.id ?? null,
      providerName: product.providerName ?? '',
      imageUrl: product.imageUrl ?? '',
    };
  }

  /** Strings vacíos / null se omiten para que el backend los trate como ausentes. */
  private toRequest(): ProductRequest {
    const v = this.form.value;
    return {
      isbn: v.isbn,
      title: v.title,
      authorIds: v.authorIds,
      categoryId: v.categoryId ?? undefined,
      publisherId: v.publisherId ?? undefined,
      providerName: v.providerName || undefined,
      yearPublished: v.yearPublished ?? undefined,
      pages: v.pages ?? undefined,
      format: v.format || undefined,
      language: v.language || undefined,
      price: v.price,
      imageUrl: v.imageUrl || undefined,
    };
  }
}

/** El backend acepta espacios y guiones; valida 13 dígitos tras limpiarlos. */
function isbn13Validator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').replace(/[\s-]/g, '');
  return !value || /^\d{13}$/.test(value) ? null : { isbn: true };
}
