import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterStockComponent } from '@app/shared/components/register-stock/register-stock.component';
export interface PeriodicElement {
  title: string;
  isbn: number;
  stock: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    isbn: 1,
    title: 'Hydrogen',
    stock: 1.0079,
    symbol: 'H',
    status: 'disponible',
  },
  {
    isbn: 2,
    title: 'Helium',
    stock: 4.0026,
    symbol: 'He',
    status: 'disponible',
  },
  {
    isbn: 3,
    title: 'Lithium',
    stock: 6.941,
    symbol: 'Li',
    status: 'disponible',
  },
  {
    isbn: 4,
    title: 'Beryllium',
    stock: 9.0122,
    symbol: 'Be',
    status: 'disponible',
  },
  { isbn: 5, title: 'Boron', stock: 10.811, symbol: 'B', status: 'disponible' },
  {
    isbn: 6,
    title: 'Carbon',
    stock: 12.0107,
    symbol: 'C',
    status: 'disponible',
  },
  {
    isbn: 7,
    title: 'Nitrogen',
    stock: 14.0067,
    symbol: 'N',
    status: 'disponible',
  },
  {
    isbn: 8,
    title: 'Oxygen',
    stock: 15.9994,
    symbol: 'O',
    status: 'disponible',
  },
  {
    isbn: 9,
    title: 'Fluorine',
    stock: 18.9984,
    symbol: 'F',
    status: 'disponible',
  },
  {
    isbn: 10,
    title: 'Neon',
    stock: 20.1797,
    symbol: 'Ne',
    status: 'disponible',
  },
];
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'isbn',
    'title',
    'stock',
    'symbol',
    'status',
    'description',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goAddRegister() {
    const dialogConfig = {
      with: 'auto',
      height: 'auto',
      disableClose: true,
    };

    this.dialog.open(RegisterStockComponent, dialogConfig);
  }
}
