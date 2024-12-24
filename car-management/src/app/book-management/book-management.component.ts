import { Component, inject, OnInit } from '@angular/core';
import { BookManagementStore } from './book-management.store';
import { JsonPipe } from '@angular/common';

@Component({
    standalone: true,
    selector: 'book-management',
    imports: [JsonPipe],
    providers: [BookManagementStore],
    templateUrl: 'book-management.component.html'
})
export class BookManagementComponent implements OnInit {
    private readonly store = inject(BookManagementStore);

    books = this.store.books;

    ngOnInit() {}
}
