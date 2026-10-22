import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Product, StockMovementRequest } from '@app/core/models';
import { NotificationService } from '@app/core/services/notification.service';
import { ProductService } from '@app/core/services/product.service';
import { StockService } from '@app/core/services/stock.service';

@Component({
  selector: 'app-register-stock',
  templateUrl: './register-stock.component.html',
  styleUrls: ['./register-stock.component.scss'],
})
export class RegisterStockComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productSearch = new FormControl<Product | string | null>('');
  selected: Product | null = null;
  labels = {
    title_register: 'product.register_stock.title_register',
    type: 'product.register_stock.type',
    products: 'product.register_stock.product_stock',
    stock: 'product.register_stock.stock',
    description: 'product.register_stock.description',
    btn_register: 'replicable.btn_register',
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private stockService: StockService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<RegisterStockComponent, boolean>,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      bookId: [null as number | null, Validators.required],
      quantity: [
        null as number | null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+$/),
          this.stockAvailableValidator,
        ],
      ],
      note: ['', Validators.maxLength(255)],
    });

    // La disponibilidad depende del tipo de movimiento y del producto elegido.
    this.form.controls['type'].valueChanges.subscribe(() =>
      this.form.controls['quantity'].updateValueAndValidity()
    );

    this.productService.getProducts().subscribe((p) => {
      this.products = p;
      this.filteredProducts = this.filterProducts(this.productSearch.value);
    });

    this.productSearch.valueChanges.subscribe((value) => {
      // Typing again invalidates the previous selection
      if (typeof value === 'string') {
        this.selected = null;
        this.form.patchValue({ bookId: null });
        this.form.controls['quantity'].updateValueAndValidity();
      }
      this.filteredProducts = this.filterProducts(value);
    });
  }

  authorNames(p: Product): string {
    return (p.authors ?? []).map((a) => a.name).join(', ');
  }

  displayProduct = (p: Product | string | null): string =>
    p && typeof p !== 'string' ? `${p.title} (${this.authorNames(p)})` : '';

  onProductSelected(event: MatAutocompleteSelectedEvent): void {
    this.selected = event.option.value as Product;
    this.form.patchValue({ bookId: this.selected.id });
    this.form.controls['quantity'].updateValueAndValidity();
  }

  /** Una salida no puede superar el stock actual del producto. */
  private stockAvailableValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const isOut = this.form?.get('type')?.value === 'OUT';
    if (!isOut || !this.selected) return null;
    return Number(control.value) > this.selected.stockCurrent
      ? { exceedsStock: { available: this.selected.stockCurrent } }
      : null;
  };

  private filterProducts(value: Product | string | null): Product[] {
    const term = (typeof value === 'string' ? value : '').trim().toLowerCase();
    if (!term) {
      return this.products;
    }
    return this.products.filter(
      (p) =>
        (p.title ?? '').toLowerCase().includes(term) ||
        (p.isbn ?? '').toLowerCase().includes(term) ||
        (p.authors ?? []).some((a) => a.name.toLowerCase().includes(term)),
    );
  }

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { type, bookId, quantity, note } = this.form.value;
    const request: StockMovementRequest = {
      type,
      bookId,
      quantity,
      note: note || undefined,
    };

    this.stockService.register(request).subscribe({
      next: () => {
        this.notification.success(
          type === 'IN'
            ? 'notifications.stock_in'
            : 'notifications.stock_out'
        );
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) =>
        this.notification.error(
          err.status === 409 || err.status === 400
            ? 'notifications.stock_insufficient'
            : 'notifications.stock_error'
        ),
    });
  }
}
