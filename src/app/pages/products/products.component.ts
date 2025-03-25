import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductService } from '@app/core/services/mock-product.service';
import { ROUTES } from '@app/shared/constants/route-constants';
import { ViewModalComponent } from './view-modal/view-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  labels = {
    product: 'PRODUCT.PRODUCTS',
    add_product: 'PRODUCT.ADD',
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

  editProducts(id: number) {
    this.router.navigate([
      ROUTES.DASHBOARD,
      ROUTES.PRODUCTS,
      ROUTES.ADD_PRODUCTS,
      id,
    ]);
  }

  viewProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.dialog.open(ViewModalComponent, {
        width: '50vw',
        height: '60vh',
        disableClose: true,
        data: product,
      });
    });
  }
}
