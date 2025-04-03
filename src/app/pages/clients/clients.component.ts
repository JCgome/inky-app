import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENTS_MOCK } from '@app/core/models/mock-clients.data';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  labels = {
    tittle_clients: 'CLIENTS.CLIENTS',
    btn_add: 'CLIENTS.ADD',
    nif: 'CLIENTS.NIF',
    name_clients: 'CLIENTS.NAME',
    surname_clients: 'CLIENTS.LASTNAME',
    company: 'CLIENTS.COMPANY',
    email: 'CLIENTS.EMAIL',
  };
  displayedColumns = [
    'nif',
    'firstName',
    'lastName',
    'companyName',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource(CLIENTS_MOCK);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goAddClients() {
    this.router.navigate(['add-clients'], { relativeTo: this.route });
  }
}
