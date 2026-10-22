import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent {
  labels = {
    title_new: 'authors.new',
    title_edit: 'authors.edit',
    name: 'authors.form.name',
    required: 'authors.form.required',
    duplicated: 'authors.form.duplicated',
    btn_save: 'replicable.btn_save',
  };

  form = this.fb.group({
    name: [
      this.author?.name ?? '',
      [Validators.required, Validators.maxLength(100)],
    ],
  });
  saving = false;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<AuthorFormComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public author: Author | null,
  ) {}

  save(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const request = { name: (this.form.getRawValue().name ?? '').trim() };

    this.saving = true;
    const call = this.author
      ? this.catalogService.updateAuthor(this.author.id, request)
      : this.catalogService.createAuthor(request);

    call.subscribe({
      next: () => {
        this.notification.success(
          this.author
            ? 'notifications.author_updated'
            : 'notifications.author_created',
        );
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        this.saving = false;
        // Nombre único: el backend responde con conflicto si ya existe.
        if (err.status === 409) {
          this.form.controls.name.setErrors({ duplicated: true });
        } else {
          this.notification.error('notifications.author_error');
        }
      },
    });
  }
}
