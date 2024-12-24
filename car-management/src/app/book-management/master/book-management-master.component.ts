import { Component, inject, OnInit } from '@angular/core';
import { BookManagementStore } from '../book-management.store';
import { Listbox } from 'primeng/listbox';
import { IBook } from '../book-management.interface';

@Component({
  standalone: true,
  selector: 'book-management-master',
  imports: [
    Listbox
  ],
  templateUrl: 'book-management-master.component.html'
})
export class BookManagementMasterComponent {
    private readonly store = inject(BookManagementStore);

    books = this.store.books;

    bookSelected(book: IBook) {
      this.store.setSelectedBook(book.id);
    }
}
