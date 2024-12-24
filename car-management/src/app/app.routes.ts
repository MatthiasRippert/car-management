import { Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-management',
    pathMatch: 'full'
  },
  {
    path: 'book-management',
    loadComponent: () => import('./book-management/book-management.component').then(c => c.BookManagementComponent),
    title: 'Bücherverwaltung'
  }
];
