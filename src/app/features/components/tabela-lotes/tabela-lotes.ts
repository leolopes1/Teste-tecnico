import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { Lote, SituacaoLote } from '../../../models/lote';

@Component({
  selector: 'app-tabela-lotes',
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  templateUrl: './tabela-lotes.html',
  styleUrl: './tabela-lotes.scss'
})
export class TabelaLotes implements OnChanges {
  @Input() lotes: Lote[] = [];
  @Input() loading = false;

  @Output() selecaoAlterada = new EventEmitter<Lote[]>();

  readonly displayedColumns = [
    'select', 'idLote', 'dataEntrada', 'valor', 'quantidadeLancamentos',
    'usuarioRegistro', 'usuarioAprovacao', 'situacao', 'dataHoraSituacao'
  ];

  readonly selection = new SelectionModel<Lote>(true, []);

  readonly pageSizeOptions = [5, 10, 20];
  pageIndex = 0;
  pageSize = 5;

  private readonly situacaoLabels: Record<SituacaoLote, string> = {
    ABERTO: 'Aberto',
    ENVIADO: 'Enviado',
    CONFIRMADO: 'Confirmado'
  };

  get paginaAtual(): Lote[] {
    const inicio = this.pageIndex * this.pageSize;
    return this.lotes.slice(inicio, inicio + this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lotes']) {
      this.selection.clear();
      this.pageIndex = 0;
      this.emitirSelecao();
    }
  }

  todosSelecionadosNaPagina(): boolean {
    const pagina = this.paginaAtual;
    return pagina.length > 0 && pagina.every((lote) => this.selection.isSelected(lote));
  }

  algunsSelecionadosNaPagina(): boolean {
    const pagina = this.paginaAtual;
    return pagina.some((lote) => this.selection.isSelected(lote)) && !this.todosSelecionadosNaPagina();
  }

  alternarTodos(): void {
    if (this.todosSelecionadosNaPagina()) {
      this.paginaAtual.forEach((lote) => this.selection.deselect(lote));
    } else {
      this.paginaAtual.forEach((lote) => this.selection.select(lote));
    }
    this.emitirSelecao();
  }

  alternarLinha(lote: Lote): void {
    this.selection.toggle(lote);
    this.emitirSelecao();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  situacaoLabel(situacao: SituacaoLote): string {
    return this.situacaoLabels[situacao];
  }

  situacaoClasse(situacao: SituacaoLote): string {
    return `badge badge--${situacao.toLowerCase()}`;
  }

  private emitirSelecao(): void {
    this.selecaoAlterada.emit(this.selection.selected);
  }
}