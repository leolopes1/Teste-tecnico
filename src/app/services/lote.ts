import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Lote } from '../models/lote';
import { FiltroLote } from '../models/filtro-lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private readonly lotes: Lote[] = [
    {
      id: 1001,
      dataEntrada: new Date('2026-08-20'),
      valor: 1500.50,
      quantidadeLancamentos: 3,
      usuarioRegistro: 'JOAO.SILVA',
      usuarioAprovacao: null,
      situacao: 'ABERTO',
      dataHoraSituacao: new Date('2026-08-20T10:30:00')
    },
    {
      id: 1002,
      dataEntrada: new Date('2026-08-21'),
      valor: 3250.00,
      quantidadeLancamentos: 5,
      usuarioRegistro: 'MARIA.SOUZA',
      usuarioAprovacao: 'CARLOS',
      situacao: 'ENVIADO',
      dataHoraSituacao: new Date('2026-08-21T14:15:00')
    },
    {
      id: 1003,
      dataEntrada: new Date('2026-08-22'),
      valor: 850.75,
      quantidadeLancamentos: 2,
      usuarioRegistro: 'JOAO.SILVA',
      usuarioAprovacao: 'CARLOS',
      situacao: 'CONFIRMADO',
      dataHoraSituacao: new Date('2026-08-22T09:45:00')
    },
    {
      id: 1004,
      dataEntrada: new Date('2026-08-23'),
      valor: 9200.00,
      quantidadeLancamentos: 8,
      usuarioRegistro: 'ANA',
      usuarioAprovacao: null,
      situacao: 'ABERTO',
      dataHoraSituacao: new Date('2026-08-23T16:20:00')
    }
  ];

  pesquisar(filtros: FiltroLote): Observable<Lote[]> {
    const resultado = this.lotes.filter((lote) =>
      this.aplicarFiltros(lote, filtros)
    );

    return of(resultado).pipe(
      delay(600)
    );
  }

  private aplicarFiltros(
    lote: Lote,
    filtros: FiltroLote
  ): boolean {

    if (
      filtros.situacao !== 'TODAS' &&
      lote.situacao !== filtros.situacao
    ) {
      return false;
    }

    if (
      filtros.idLoteDe !== null &&
      lote.id < filtros.idLoteDe
    ) {
      return false;
    }

    if (
      filtros.idLoteAte !== null &&
      lote.id > filtros.idLoteAte
    ) {
      return false;
    }

    if (
      filtros.valorLoteDe !== null &&
      lote.valor < filtros.valorLoteDe
    ) {
      return false;
    }

    if (
      filtros.valorLoteAte !== null &&
      lote.valor > filtros.valorLoteAte
    ) {
      return false;
    }

    if (
      filtros.dataEntradaDe &&
      lote.dataEntrada < filtros.dataEntradaDe
    ) {
      return false;
    }

    if (
      filtros.dataEntradaAte &&
      lote.dataEntrada > filtros.dataEntradaAte
    ) {
      return false;
    }

    return true;
  }
}