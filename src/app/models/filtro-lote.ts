export interface FiltroLote {
  instituicaoResponsavel: string;
  instituicao: string;
  situacao: SituacaoFiltro;
  idLoteDe: number | null;
  idLoteAte: number | null;
  valorLoteDe: number | null;
  valorLoteAte: number | null;
  dataEntradaDe: Date | null;
  dataEntradaAte: Date | null;
}

export type SituacaoFiltro =
  | 'TODAS'
  | 'ABERTO'
  | 'ENVIADO'
  | 'CONFIRMADO';