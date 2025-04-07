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
    title_products: 'product.management_products.title_products',
    title_books: 'product.management_products.title',
    author: 'product.management_products.author',
    isbn: 'product.management_products.id',
    gender: 'product.management_products.gender',
    year_publish: 'product.management_products.year_publish',
    price: 'product.management_products.price',
    stock: 'product.management_products.stock',
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
        this.router.navigate([ROUTES.dashboard, ROUTES.products]);
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
    this.router.navigate([ROUTES.dashboard, ROUTES.products]);
  }

  guardarProducto() {
    if (this.form.valid) {
      const product = this.form.value;

      if (this.isEditMode && this.editingProductId !== null) {
        this.productService
          .updateProduct(this.editingProductId, product)
          .subscribe(() => {
            this.router.navigate([ROUTES.dashboard, ROUTES.products]);
          });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          this.router.navigate([ROUTES.dashboard, ROUTES.products]);
        });
      }
    }
  }
}
