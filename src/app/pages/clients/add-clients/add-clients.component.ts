import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockClientsService } from '@app/core/services/mock-clients.service';
import { ROUTES } from '@app/shared/constants/route-constants';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss'],
})
export class AddClientsComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  isEditMode = false;
  editingClientId: number | null = null;
  selectedFileName: string = '';

  labels = {
    create_clients: 'client.management_clients.title_clients',
    nif: 'client.management_clients.nif',
    name: 'client.management_clients.name',
    surname: 'client.management_clients.surname',
    publisher: 'client.management_clients.publisher',
    email: 'client.management_clients.mail',
    phone: 'client.management_clients.phone',
    address: 'client.management_clients.address',
    postal: 'client.management_clients.postal_code',
    city: 'client.management_clients.city',
    country: 'client.management_clients.country',
    btn_cancel: 'replicable.btn_cancel',
    btn_save: 'replicable.btn_save',
    title_edit: 'replicable.title_edit',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clientService: MockClientsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nif: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      email: [''],
      phone_number: [''],
      address: [''],
      zip_code: [''],
      city: [''],
      country: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadClientToEdit(+id);
    }
  }

  loadClientToEdit(id: number) {
    this.isEditMode = true;
    this.editingClientId = id;

    this.clientService.getClientById(id).subscribe((client) => {
      if (client) {
        this.form.patchValue(client);
      } else {
        this.router.navigate([ROUTES.dashboard, ROUTES.clients]);
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

  goSaveClient() {
    if (this.form.valid) {
      const client = this.form.value;

      if (this.isEditMode && this.editingClientId !== null) {
        this.clientService
          .updateClient(this.editingClientId, client)
          .subscribe(() => {
            this.router.navigate([ROUTES.dashboard, ROUTES.clients]);
          });
      } else {
        this.clientService.createClient(client).subscribe(() => {
          this.router.navigate([ROUTES.dashboard, ROUTES.clients]);
        });
      }
    }
  }

  goCancel() {
    this.router.navigate([ROUTES.dashboard, ROUTES.clients]);
  }
}
