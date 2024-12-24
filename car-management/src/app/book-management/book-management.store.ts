import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { IBookManagementState } from './book-management.interface';
import { inject } from '@angular/core';
import { BookManagementService } from './shared/book-management.service';
import { firstValueFrom } from 'rxjs';

const initialState: IBookManagementState = {
    books: [],
    loading: false,
    selectedBook: {
        bookName: '',
        author: '',
        category: '',
        price: 0,
        id: ''
    }
};

export const BookManagementStore = signalStore(
    withState<IBookManagementState>(initialState),
    withMethods(store => {
        const bookService = inject(BookManagementService);

        return {
            async getBooks() {
                patchState(store, { loading: true });
                const books = await firstValueFrom(bookService.getBooks());
                patchState(store, { loading: false, books });
            }
        };
    }),
    withHooks(store => {
        return {
            async onInit() {
                await store.getBooks();
            }
        };
    })
);
