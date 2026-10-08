import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product, StockMovementRequest } from '@app/core/models';
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
    private dialogRef: MatDialogRef<RegisterStockComponent, boolean>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      bookId: [null as number | null, Validators.required],
      quantity: [null as number | null, [Validators.required, Validators.min(1)]],
      note: ['', Validators.maxLength(255)],
    });

    this.productService.getProducts().subscribe((p) => (this.products = p));
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

    this.stockService
      .register(request)
      .subscribe(() => this.dialogRef.close(true));
  }
}
