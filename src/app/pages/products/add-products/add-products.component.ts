import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ROUTES } from '@app/shared/constants/route-constants';
import { MockProductService } from '@app/core/services/mock-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent {
  form: FormGroup = this.fb.group({});
  selectedFileName: string = '';
  isEditMode = false;
  editingProductId: number | null = null;

  labels = {
    title_products: 'PRODUCT.ADD_PRODUCTS.TITLE_PRODUCTS',
    title_books: 'PRODUCT.ADD_PRODUCTS.TITLE',
    author: 'PRODUCT.ADD_PRODUCTS.AUTHOR',
    isbn: 'PRODUCT.ADD_PRODUCTS.ID',
    gender: 'PRODUCT.ADD_PRODUCTS.GENDER',
    year_publish: 'PRODUCT.ADD_PRODUCTS.YEAR_PUBLISH',
    price: 'PRODUCT.ADD_PRODUCTS.PRICE',
    stock: 'PRODUCT.ADD_PRODUCTS.STOCK',
    number_pag: 'PRODUCT.ADD_PRODUCTS.NUMBER_PAG',
    format: 'PRODUCT.ADD_PRODUCTS.FORMAT',
    language: 'PRODUCT.ADD_PRODUCTS.LANGUAGE',
    publisher: 'PRODUCT.ADD_PRODUCTS.PUBLISHER',
    provider: 'PRODUCT.ADD_PRODUCTS.PROVIDER',
    image_product: 'PRODUCT.ADD_PRODUCTS.IMAGE_PRODUCT',
    select_image: 'PRODUCT.ADD_PRODUCTS.SELECT_IMAGE',
    select_file: 'PRODUCT.ADD_PRODUCTS.SELECT_FILE',
    btn_cancel: 'REPLICABLE.BTN_CANCEL',
    btn_save: 'REPLICABLE.BTN_SAVE',
  };

  constructor(
    private fb: FormBuilder,
    private productService: MockProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      gender: [''],
      year_publish: ['', Validators.required],
      price: ['', Validators.required],
      stock: [''],
      number_pag: [''],
      format: [''],
      language: [''],
      publisher: [''],
      provider: [''],
      image: [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProductToEdit(+id);
    }
  }

  loadProductToEdit(id: number) {
    this.isEditMode = true;
    this.editingProductId = id;

    this.productService.getProductById(id).subscribe((product) => {
      if (product) {
        this.form.patchValue(product);
      } else {
        this.router.navigate([ROUTES.DASHBOARD, ROUTES.PRODUCTS]);
      }
    });
  }

  onFileSelected(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.form.patchValue({ image: file.name });
    }
  }

  goCancel() {
    this.router.navigate([ROUTES.DASHBOARD, ROUTES.PRODUCTS]);
  }

  guardarProducto() {
    if (this.form.valid) {
      const product = this.form.value;

      if (this.isEditMode && this.editingProductId !== null) {
        this.productService
          .updateProduct(this.editingProductId, product)
          .subscribe(() => {
            this.router.navigate([ROUTES.DASHBOARD, ROUTES.PRODUCTS]);
          });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          this.router.navigate([ROUTES.DASHBOARD, ROUTES.PRODUCTS]);
        });
      }
    }
  }
}
