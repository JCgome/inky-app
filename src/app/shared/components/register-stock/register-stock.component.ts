import { Component } from '@angular/core';

@Component({
  selector: 'app-register-stock',
  templateUrl: './register-stock.component.html',
  styleUrls: ['./register-stock.component.scss'],
})
export class RegisterStockComponent {
  labels = {
    title_register: 'product.register_stock.title_register',
    type: 'product.register_stock.type',
    products: 'product.register_stock.product_stock',
    stock: 'product.register_stock.stock',
    description: 'product.register_stock.description',
    btn_register: 'replicable.btn_register',
  };
}
