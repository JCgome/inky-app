import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss'],
})
export class ViewModalComponent {
  product: any;

  labels = {
    title_products: 'PRODUCT.MANAGEMENT_PRODUCTS.TITLE_PRODUCTS',
    title_books: 'PRODUCT.MANAGEMENT_PRODUCTS.TITLE',
    author: 'PRODUCT.MANAGEMENT_PRODUCTS.AUTHOR',
    isbn: 'PRODUCT.MANAGEMENT_PRODUCTS.ID',
    gender: 'PRODUCT.MANAGEMENT_PRODUCTS.GENDER',
    year_publish: 'PRODUCT.MANAGEMENT_PRODUCTS.YEAR_PUBLISH',
    price: 'PRODUCT.MANAGEMENT_PRODUCTS.PRICE',
    stock: 'PRODUCT.MANAGEMENT_PRODUCTS.STOCK',
    number_pag: 'PRODUCT.MANAGEMENT_PRODUCTS.NUMBER_PAG',
    format: 'PRODUCT.MANAGEMENT_PRODUCTS.FORMAT',
    language: 'PRODUCT.MANAGEMENT_PRODUCTS.LANGUAGE',
    publisher: 'PRODUCT.MANAGEMENT_PRODUCTS.PUBLISHER',
    provider: 'PRODUCT.MANAGEMENT_PRODUCTS.PROVIDER',
    image_product: 'PRODUCT.MANAGEMENT_PRODUCTS.IMAGE_PRODUCT',
    select_image: 'PRODUCT.MANAGEMENT_PRODUCTS.SELECT_IMAGE',
    select_file: 'PRODUCT.MANAGEMENT_PRODUCTS.SELECT_FILE',
    btn_cancel: 'REPLICABLE.BTN_CANCEL',
    btn_save: 'REPLICABLE.BTN_SAVE',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.product = data;
  }
}
