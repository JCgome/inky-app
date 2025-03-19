import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns = ['id', 'nombre', 'precio', 'categoria', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products = [
    { id: '0001', nombre: 'Producto 1', precio: 10, categoria: 'A' },
    { id: '0002 ', nombre: 'Producto 2', precio: 20, categoria: 'B' },
    { id: '0003 ', nombre: 'Producto 3', precio: 30, categoria: 'C' },
    { id: '0004 ', nombre: 'Producto 1', precio: 10, categoria: 'A' },
    { id: '0005 ', nombre: 'Producto 2', precio: 20, categoria: 'B' },
    { id: '0006 ', nombre: 'Producto 3', precio: 30, categoria: 'C' },
    { id: '0007 ', nombre: 'Producto 1', precio: 10, categoria: 'A' },
    { id: '0008 ', nombre: 'Producto 2', precio: 20, categoria: 'B' },
    { id: '0009 ', nombre: 'Producto 3', precio: 30, categoria: 'C' },
    { id: '0010 ', nombre: 'Producto 1', precio: 10, categoria: 'A' },
    { id: '0011 ', nombre: 'Producto 2', precio: 20, categoria: 'B' },
    { id: '0012 ', nombre: 'Producto 3', precio: 30, categoria: 'C' },
  ];

  ngOnInit() {
    this.dataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
