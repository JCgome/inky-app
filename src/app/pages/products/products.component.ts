import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductService } from '@app/core/services/mock-product.service';
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
  displayedColumns = ['isbn', 'title', 'stock', 'gender', 'actions'];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: MockProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((productos) => {
      this.dataSource = new MatTableDataSource(productos);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goAddProducts() {
    this.router.navigate(['add-products'], { relativeTo: this.route });
  }

  goAddRegister() {
    this.dialog.open(RegisterStockComponent),
      {
        width: '50vw',
        height: '60vh',
        disableClose: true,
      };
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
        disableClose: true,
        data: {
          data: product,
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
          this.productService.getProducts().subscribe((productos) => {
            this.dataSource.data = productos;
          });
        });
      }
    });
  }
}
