import { Component, computed, inject, signal } from '@angular/core';
import { Lote } from '../../../models/lote';
import { LoteService } from '../../../services/lote';
import { FiltroLote } from '../../../models/filtro-lote';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltrosLote } from '../filtros-lote/filtros-lote';
import { TabelaLotes } from '../../components/tabela-lotes/tabela-lotes';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from '../../../models/lancamento';
import { LancamentoDialog, LancamentoDialogData } from '../../components/lancamento-dialog/lancamento-dialog';


@Component({
  imports: [MatButtonModule, MatIconModule, FiltrosLote, TabelaLotes],
  selector: 'app-consulta-lotes',
  styleUrl: './consulta-lotes.scss',
  templateUrl: './consulta-lotes.html',
})
export class ConsultaLotes {
  private readonly loteService = inject(LoteService);

  readonly lotes = signal<Lote[]>([]);
  readonly selecionados = signal<Lote[]>([]);

  readonly loading = signal(false);
  readonly filtrosVisiveis = signal(true);

  readonly possuiSelecao = computed(
    () => this.selecionados().length > 0
  );

  readonly selecaoUnica = computed(
    () => this.selecionados().length === 1
  );
  private readonly dialog = inject(MatDialog);
  private readonly lancamentosPorLote = new Map<number, Lancamento[]>();

  pesquisar(filtros: FiltroLote): void {

    this.loading.set(true);
    this.selecionados.set([]);

    this.loteService
      .pesquisar(filtros)
      .subscribe({
        next: (lotes) => {
          this.lotes.set(lotes);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  onSelecaoAlterada(lotes: Lote[]): void {
    this.selecionados.set(lotes);
  }

  alternarFiltros(): void {
    this.filtrosVisiveis.update(
      visible => !visible
    );
  }

  confirmar(): void {
    console.log('Confirmar', this.selecionados());
  }

  enviar(): void {
    console.log('Enviar', this.selecionados());
  }

  visualizarJustificativa(): void {
    console.log(
      'Justificativa',
      this.selecionados()
    );
  }

  incluir(): void {

    const loteSelecionado = this.selecaoUnica() ? this.selecionados()[0] : null;
    const loteId = loteSelecionado?.id ?? 0;
    const lancamentosAtuais = this.lancamentosPorLote.get(loteId) ?? [];

    const dialogRef = this.dialog.open<LancamentoDialog, LancamentoDialogData, Lancamento[]>(
      LancamentoDialog,
      {
        width: '720px',
        maxWidth: '95vw',
        autoFocus: false,
        data: { loteId, lancamentos: lancamentosAtuais }
      }
    );

    dialogRef.afterClosed().subscribe((lancamentos) => {
      if (lancamentos) {
        this.lancamentosPorLote.set(loteId, lancamentos);
      }
    });
  }

}
