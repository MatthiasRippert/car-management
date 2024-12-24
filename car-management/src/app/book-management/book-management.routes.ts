import { Routes } from '@angular/router';

export const BookManagementRoutes: Routes = [
  {
    path: '',
    redirectTo: '.',
    pathMatch: 'full',
    title: 'Bücherverwaltung'
  },
  {
    path: ':id',
    loadComponent: () => import('./book-management.component').then(c => c.BookManagementComponent),
  }
];
