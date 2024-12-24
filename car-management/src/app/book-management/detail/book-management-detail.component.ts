import { Component, inject, OnInit } from '@angular/core';
import { BookManagementStore } from '../book-management.store';

@Component({
    standalone: true,
    selector: 'book-management-detail-component',
    templateUrl: 'book-management-detail-component.component.html'
})
export class BookManagementDetailComponent implements OnInit {
    private readonly store = inject(BookManagementStore);

    ngOnInit() {}
}
