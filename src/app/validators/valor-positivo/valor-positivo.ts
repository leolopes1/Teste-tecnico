import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador customizado: garante que o valor informado seja maior que zero.
 * Campos vazios não são tratados aqui (fica a cargo de Validators.required).
 */
export function valorPositivoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if (valor === null || valor === undefined || valor === '') {
      return null;
    }

    return Number(valor) > 0 ? null : { valorPositivo: true };
  };
}