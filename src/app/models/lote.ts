export type SituacaoLote =
  | 'ABERTO'
  | 'ENVIADO'
  | 'CONFIRMADO';

export interface Lote {
  id: number;
  dataEntrada: Date;
  valor: number;
  quantidadeLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string | null;
  situacao: SituacaoLote;
  dataHoraSituacao: Date;
}
