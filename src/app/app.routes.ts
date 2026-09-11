import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lotes',
    pathMatch: 'full',
  },
  {
    path: 'lotes',
    loadComponent: () =>
      import('./features/pages/consulta-lotes/consulta-lotes')
        .then((m) => m.ConsultaLotes),
  },
];