import { Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddBookFrom, IBookResponse, WrappedFormControls } from '../../book-management.interface';
import { Button } from 'primeng/button';
import { BookManagementStore } from '../../book-management.store';
import { AddNewBookService } from './shared/add-new-book.service';
import { firstValueFrom } from 'rxjs';
import { PossibleBookCategories } from '../../test-data';
import { Select } from 'primeng/select';

@Component({
    selector: 'add-new-book-dialog',
    imports: [Dialog, FormsModule, ReactiveFormsModule, Button, Select],
    providers: [AddNewBookService],
    templateUrl: 'add-new-book-dialog.component.html'
})
export class AddNewBookDialogComponent {
    private readonly store = inject(BookManagementStore);
    private readonly dataService = inject(AddNewBookService);

    possibleCategories = PossibleBookCategories;

    formGroup: FormGroup<WrappedFormControls<IAddBookFrom>> = new FormGroup({
        bookName: new FormControl<string>(undefined, Validators.required),
        category: new FormControl<string>(undefined, Validators.required),
        author: new FormControl<string>(undefined, Validators.required),
        price: new FormControl<number>(undefined, Validators.required)
    });

    async addBook() {
        const book = await firstValueFrom(this.dataService.addNewBook(this.formGroup.value as IAddBookFrom));

        if (book == undefined) return;

        this.store.closeAddBookDialog(book);
    }
    close() {
        this.store.closeAddBookDialog(undefined);
    }
}
