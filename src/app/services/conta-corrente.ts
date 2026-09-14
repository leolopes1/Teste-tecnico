import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

interface ContaCorrenteMock {
  numero: string;
  titular: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContaCorrenteService {
  private readonly contas: ContaCorrenteMock[] = [
    { numero: '44444', titular: 'Ana Paula Costa' },
    { numero: '55555', titular: 'Carlos Eduardo Lima' },
    { numero: '66666', titular: 'Mariana Torres' }
  ];

  buscar(numero: string): Observable<string | null> {
    const conta = this.contas.find((c) => c.numero === numero.trim());
    return of(conta ? conta.titular : null).pipe(delay(400));
  }
}