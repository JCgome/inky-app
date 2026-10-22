import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * ISBN-13: acepta espacios y guiones; exige 13 dígitos y dígito de control
 * válido. Un campo vacío se delega a Validators.required.
 */
export function isbn13Validator(
  control: AbstractControl
): ValidationErrors | null {
  const value = String(control.value ?? '').replace(/[\s-]/g, '');
  if (!value) return null;
  if (!/^\d{13}$/.test(value)) return { isbn: true };

  const sum = [...value].reduce(
    (acc, d, i) => acc + Number(d) * (i % 2 === 0 ? 1 : 3),
    0
  );
  return sum % 10 === 0 ? null : { isbn: true };
}
