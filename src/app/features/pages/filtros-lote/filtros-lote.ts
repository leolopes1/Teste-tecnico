import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FiltroLote } from '../../../models/filtro-lote';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-filtros-lote',
  styleUrl: './filtros-lote.scss',
  templateUrl: './filtros-lote.html',
})
export class FiltrosLote {
  private readonly fb = inject(FormBuilder);

  @Output()
  pesquisar = new EventEmitter<FiltroLote>();

  readonly form = this.fb.group({
    instituicaoResponsavel: [''],
    instituicao: [''],
    situacao: ['TODAS'],

    idLoteDe: [
      null as number | null,
      [Validators.min(0)]
    ],

    idLoteAte: [
      null as number | null,
      [Validators.min(0)]
    ],

    valorLoteDe: [
      null as number | null,
      [Validators.min(0)]
    ],

    valorLoteAte: [
      null as number | null,
      [Validators.min(0)]
    ],

    dataEntradaDe: [null as Date | null],
    dataEntradaAte: [null as Date | null]
  });

  onPesquisar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pesquisar.emit(
      this.form.getRawValue() as FiltroLote
    );
  }

}
