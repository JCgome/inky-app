import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-stock',
  templateUrl: './register-stock.component.html',
  styleUrls: ['./register-stock.component.scss'],
})
export class RegisterStockComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  labels = {
    title_register: 'product.register_stock.title_register',
    type: 'product.register_stock.type',
    products: 'product.register_stock.product_stock',
    stock: 'product.register_stock.stock',
    description: 'product.register_stock.description',
    btn_register: 'replicable.btn_register',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      products: ['', Validators.required],
      stock: ['', Validators.required],
      description: [''],
    });
  }
}
