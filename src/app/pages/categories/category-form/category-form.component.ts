import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '@app/core/models';
import { CatalogService } from '@app/core/services/catalog.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  labels = {
    title_new: 'categories.new',
    title_edit: 'categories.edit',
    name: 'categories.form.name',
    description: 'categories.form.description',
    required: 'categories.form.required',
    duplicated: 'categories.form.duplicated',
    btn_cancel: 'replicable.btn_cancel',
    btn_save: 'replicable.btn_save',
  };

  form = this.fb.group({
    name: [
      this.category?.name ?? '',
      [Validators.required, Validators.maxLength(100)],
    ],
    description: [this.category?.description ?? '', Validators.maxLength(255)],
  });
  saving = false;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private dialogRef: MatDialogRef<CategoryFormComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public category: Category | null
  ) {}

  save(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description } = this.form.getRawValue();
    const request = {
      name: (name ?? '').trim(),
      description: (description ?? '').trim() || undefined,
    };

    this.saving = true;
    const call = this.category
      ? this.catalogService.updateCategory(this.category.id, request)
      : this.catalogService.createCategory(request);

    call.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err: HttpErrorResponse) => {
        this.saving = false;
        // Nombre único: el backend responde con conflicto si ya existe.
        if (err.status === 409) {
          this.form.controls.name.setErrors({ duplicated: true });
        }
      },
    });
  }
}
