import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Lancamento } from '../../../models/lancamento';
import { ContaCorrenteService } from '../../../services/conta-corrente';
import { valorPositivoValidator } from '../../../validators/valor-positivo/valor-positivo';


export interface LancamentoDialogData {
  loteId: number;
  lancamentos: Lancamento[];
}

@Component({
  selector: 'app-lancamento-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './lancamento-dialog.html',
  styleUrl: './lancamento-dialog.scss'
})
export class LancamentoDialog {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LancamentoDialog>);
  private readonly contaCorrenteService = inject(ContaCorrenteService);
  readonly data = inject<LancamentoDialogData>(MAT_DIALOG_DATA);

  private proximoId = Math.max(0, ...this.data.lancamentos.map((l) => l.id)) + 1;

  readonly lancamentos = signal<Lancamento[]>([...this.data.lancamentos]);
  readonly selecionadoId = signal<number | null>(null);
  readonly modoVisualizacao = signal(false);
  readonly buscandoTitular = signal(false);
  readonly titularEncontrado = signal<string | null>(null);
  readonly buscaSemResultado = signal(false);

  readonly displayedColumns = ['id', 'pa', 'contaCorrente', 'historico', 'situacao'];

  readonly possuiSelecao = computed(() => this.selecionadoId() !== null);

  readonly form = this.fb.group({
    contaCorrente: ['', Validators.required],
    valor: [null as number | null, [Validators.required, valorPositivoValidator()]],
    historico: ['Lançamento Manual', Validators.required],
    estorno: [false],
    documento: ['', Validators.required],
    descricao: [''],
    situacao: [{ value: 'PENDENTE', disabled: true }],
    pa: ['', Validators.required]
  });

  constructor() {
    this.form.controls.contaCorrente.valueChanges.subscribe(() => {
      this.titularEncontrado.set(null);
      this.buscaSemResultado.set(false);
    });
  }

  buscarConta(): void {
    const numero = this.form.controls.contaCorrente.value?.trim();

    if (!numero) {
      this.form.controls.contaCorrente.markAsTouched();
      return;
    }

    this.buscandoTitular.set(true);
    this.buscaSemResultado.set(false);

    this.contaCorrenteService.buscar(numero).subscribe((titular) => {
      this.buscandoTitular.set(false);
      this.titularEncontrado.set(titular);
      this.buscaSemResultado.set(!titular);
    });
  }

  selecionar(lancamento: Lancamento): void {
    this.selecionadoId.set(
      this.selecionadoId() === lancamento.id ? null : lancamento.id
    );
  }

  incluir(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();

    const novo: Lancamento = {
      id: this.proximoId++,
      contaCorrente: valores.contaCorrente!,
      titularConta: this.titularEncontrado() ?? '',
      valor: valores.valor!,
      historico: valores.historico!,
      estorno: !!valores.estorno,
      documento: valores.documento!,
      descricao: valores.descricao ?? '',
      situacao: 'PENDENTE',
      pa: valores.pa!
    };

    this.lancamentos.update((atual) => [...atual, novo]);
    this.limparFormulario();
  }

  alterar(): void {
    const id = this.selecionadoId();

    if (id === null) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();

    this.lancamentos.update((atual) =>
      atual.map((lancamento) =>
        lancamento.id === id
          ? {
              ...lancamento,
              contaCorrente: valores.contaCorrente!,
              titularConta: this.titularEncontrado() ?? lancamento.titularConta,
              valor: valores.valor!,
              historico: valores.historico!,
              estorno: !!valores.estorno,
              documento: valores.documento!,
              descricao: valores.descricao ?? '',
              pa: valores.pa!
            }
          : lancamento
      )
    );

    this.limparFormulario();
  }

  excluir(): void {
    const id = this.selecionadoId();

    if (id === null) {
      return;
    }

    this.lancamentos.update((atual) => atual.filter((l) => l.id !== id));
    this.limparFormulario();
  }

  visualizar(): void {
    const lancamento = this.lancamentoSelecionado();

    if (!lancamento) {
      return;
    }

    this.preencherFormulario(lancamento);
    this.modoVisualizacao.set(true);
    this.form.disable({ emitEvent: false });
  }

  duplicar(): void {
    const lancamento = this.lancamentoSelecionado();

    if (!lancamento) {
      return;
    }

    this.modoVisualizacao.set(false);
    this.form.enable({ emitEvent: false });
    this.form.controls.situacao.disable({ emitEvent: false });
    this.preencherFormulario(lancamento);
    this.selecionadoId.set(null);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.lancamentos());
  }

  private lancamentoSelecionado(): Lancamento | undefined {
    return this.lancamentos().find((l) => l.id === this.selecionadoId());
  }

  private preencherFormulario(lancamento: Lancamento): void {
    this.form.patchValue({
      contaCorrente: lancamento.contaCorrente,
      valor: lancamento.valor,
      historico: lancamento.historico,
      estorno: lancamento.estorno,
      documento: lancamento.documento,
      descricao: lancamento.descricao,
      situacao: lancamento.situacao,
      pa: lancamento.pa
    });
    this.titularEncontrado.set(lancamento.titularConta || null);
  }

  private limparFormulario(): void {
    this.modoVisualizacao.set(false);
    this.form.enable({ emitEvent: false });
    this.form.controls.situacao.disable({ emitEvent: false });
    this.form.reset({
      contaCorrente: '',
      valor: null,
      historico: 'Lançamento Manual',
      estorno: false,
      documento: '',
      descricao: '',
      situacao: 'PENDENTE',
      pa: ''
    });
    this.titularEncontrado.set(null);
    this.buscaSemResultado.set(false);
    this.selecionadoId.set(null);
  }
}