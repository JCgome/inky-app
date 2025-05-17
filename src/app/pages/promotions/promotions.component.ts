import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PROMOTIONS_DATA } from '@app/core/models/mock-promotions.data';
import { Promotion } from '@app/core/models/promotion.model';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent {
  dataSource = new MatTableDataSource<Promotion>();
  selection = new SelectionModel<Promotion>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'select',
    'name',
    'discountType',
    'startDate',
    'endDate',
    'subscriptionCount',
    'averagePercentage',
    'grossIncome',
    'status',
    'options',
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataSource.data = PROMOTIONS_DATA;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Promotion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }

  goAddPromotions() {
    this.router.navigate(['add-promotions'], { relativeTo: this.route });
  }
}
