import { Component, inject, OnInit } from '@angular/core';
import { BookManagementStore } from '../book-management.store';

@Component({
    standalone: true,
    selector: 'book-management-master',
    templateUrl: 'book-management-master.component.html'
})
export class BookManagementMasterComponent {
    private readonly store = inject(BookManagementStore);

    books = this.store.books;
}
