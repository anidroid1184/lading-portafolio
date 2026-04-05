import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading').then((m) => m.Loading),
  },
  {
    path: '',
    loadComponent: () => import('./shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'whoami',
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/experience/experience').then((m) => m.Experience),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
      },
    ],
  },
  { path: '**', redirectTo: 'whoami' },
];
