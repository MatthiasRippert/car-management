import { Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookManagementRoutes } from './book-management/book-management.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-management',
    pathMatch: 'full'
  },
  {
    path: 'book-management',
    loadChildren: () => import('./book-management/book-management.routes').then(c => c.BookManagementRoutes),
  }
];
