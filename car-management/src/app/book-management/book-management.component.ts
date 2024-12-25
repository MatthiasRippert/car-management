import { Component, inject, OnInit } from '@angular/core';
import { BookManagementStore } from './book-management.store';
import { JsonPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Splitter } from 'primeng/splitter';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { BookManagementMasterComponent } from './master/book-management-master.component';
import { BookManagementDetailComponent } from './detail/book-management-detail.component';
import { Menu } from 'primeng/menu';
import { AddNewBookDialogComponent } from './dialogs/add-new-book/add-new-book-dialog.component';

@Component({
    selector: 'book-management',
    providers: [BookManagementStore],
    imports: [Splitter, PrimeTemplate, BookManagementMasterComponent, BookManagementDetailComponent, AddNewBookDialogComponent],
    templateUrl: 'book-management.component.html'
})
export class BookManagementComponent implements OnInit {
    private readonly store = inject(BookManagementStore);

    showFlags = this.store.showFlags;

    ngOnInit() {}
}
