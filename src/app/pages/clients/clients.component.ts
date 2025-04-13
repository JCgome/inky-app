import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MockClientsService } from '@app/core/services/mock-clients.service';
import { DetailsModalComponent } from '@app/shared/components/details-modal/details-modal.component';
import { DialogDeleteComponent } from '@app/shared/components/dialog-delete/dialog-delete.component';
import { ROUTES } from '@app/shared/constants/route-constants';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  labels = {
    tittle_clients: 'client.clients',
    btn_add: 'client.add',
    nif: 'client.nif',
    name_clients: 'client.name',
    surname_clients: 'client.last_name',
    company: 'client.company',
    email: 'client.email',
    name: 'client.management_clients.name',
    surname: 'client.management_clients.surname',
    publisher: 'client.management_clients.publisher',
    phone: 'client.management_clients.phone',
    address: 'client.management_clients.address',
    postal: 'client.management_clients.postal_code',
    city: 'client.management_clients.city',
    country: 'client.management_clients.country',
    btn_cancel: 'replicable.btn_cancel',
    btn_save: 'replicable.btn_save',
    title_edit: 'replicable.title_edit',
  };
  displayedColumns = [
    'nif',
    'firstName',
    'lastName',
    'companyName',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: MockClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.clientService.getClients().subscribe((clients) => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goAddClients() {
    this.router.navigate(['add-clients'], { relativeTo: this.route });
  }

  goViewClient(id: number): void {
    this.clientService.getClientById(id).subscribe((client) => {
      this.dialog.open(DetailsModalComponent, {
        width: '50vw',
        height: '60vh',
        disableClose: true,
        data: {
          data: client,
          fields: [
            { label: this.labels.nif, key: 'nif' },
            { label: this.labels.name_clients, key: 'firstName' },
            { label: this.labels.surname_clients, key: 'lastName' },
            { label: this.labels.company, key: 'companyName' },
            { label: this.labels.email, key: 'email' },
            { label: this.labels.phone, key: 'phone' },
            { label: this.labels.address, key: 'address' },
            { label: this.labels.postal, key: 'zip_code' },
            { label: this.labels.city, key: 'city' },
            { label: this.labels.country, key: 'country' },
          ],
        },
      });
    });
  }

  goDeleteClients(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { entityName: 'cliente' },
      width: '30vw',
      height: '45vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.clientService.deleteClient(id).subscribe(() => {
          this.clientService.getClients().subscribe((clients) => {
            this.dataSource.data = clients;
          });
        });
      }
    });
  }

  goEditClients(id: number) {
    this.router.navigate([
      ROUTES.dashboard,
      ROUTES.clients,
      ROUTES.add_clients,
      id,
    ]);
  }
}
