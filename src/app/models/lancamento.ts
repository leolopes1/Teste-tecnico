export interface Lancamento {
  id: number;
  contaCorrente: string;
  titularConta: string;
  valor: number;
  historico: string;
  estorno: boolean;
  documento: string;
  descricao: string;
  situacao: 'PENDENTE' | 'CONFIRMADO';
  pa: string;
}