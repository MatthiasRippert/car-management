import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Book, IBookManagementState, IBookResponse, IMasterFilter } from './book-management.interface';
import { inject } from '@angular/core';
import { BookManagementService } from './shared/book-management.service';
import { debounceTime, firstValueFrom, pipe, tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { isNullOrEmpty, isSet } from '../helpers';

const emptyBook: Book = {
    bookName: undefined,
    author: undefined,
    category: undefined,
    price: undefined,
    id: undefined,
    show: true
};

const initialState: IBookManagementState = {
    books: [],
    loadingFlags: {
        books: false,
        selectedBook: false
    },
    selectedBook: emptyBook,
    showFlags: {
        showAddDialog: false
    },
    editMode: false
};

export const BookManagementStore = signalStore(
    withState<IBookManagementState>(initialState),
    withMethods(store => {
        const bookService = inject(BookManagementService);
        const messageService = inject(MessageService);
        const router = inject(Router);
        const confirmationService = inject(ConfirmationService);

        return {
            async getBooks() {
                patchState(store, { loadingFlags: { ...store.loadingFlags(), books: true } });
                const books = await firstValueFrom(bookService.getBooks());
                patchState(store, { loadingFlags: { ...store.loadingFlags(), books: false }, books });
            },
            async setSelectedBook(id: string) {
                if (store.editMode()) {
                    messageService.add({ severity: 'warn', detail: 'Zum wechseln, Änderungsmodus verlassen' });
                    return;
                }

                patchState(store, { loadingFlags: { ...store.loadingFlags(), selectedBook: true } });
                const selectedBook = await firstValueFrom(bookService.getSelectedBook(id));
                patchState(store, { loadingFlags: { ...store.loadingFlags(), selectedBook: false }, selectedBook });

                router.navigate(['/book-management', selectedBook.id]);
            },
            startEditMode() {
                patchState(store, { editMode: true });
            },
            stopEditMode() {
                patchState(store, { editMode: false });
            },
            saveBook(book: IBookResponse) {
                let books = [...store.books()];
                let index = books.findIndex(f => f.id === book.id);

                if (index > -1) {
                    books[index] = { ...book, show: true };
                }

                patchState(store, { books, selectedBook: book, editMode: false });
            },
            deleteBook() {
                confirmationService.confirm({
                    message: `Soll das Buch <strong>${store.selectedBook().bookName}</strong> von <strong>${store.selectedBook().author}</strong> wirklich gelöscht werden?`,
                    header: 'Löschen',
                    rejectLabel: 'Abbrechen',
                    rejectButtonProps: {
                        label: 'Abbrechen',
                        severity: 'secondary',
                        outlined: true
                    },
                    acceptButtonProps: {
                        label: 'Löschen',
                        severity: 'danger'
                    },
                    accept: async () => {
                        const success = await firstValueFrom(bookService.deleteBook(store.selectedBook().id));

                        if (!success) return;

                        const books = store.books().filter(f => f.id !== store.selectedBook().id);
                        patchState(store, { books, selectedBook: emptyBook });
                        router.navigate(['/book-management']);
                    }
                });
            },
            showAddBookDialog() {
                patchState(store, { showFlags: { ...store.showFlags(), showAddDialog: true } });
            },
            closeAddBookDialog(newBook: IBookResponse) {
                patchState(store, { showFlags: { ...store.showFlags(), showAddDialog: false } });

                if (newBook != undefined) {
                    let books = [...store.books(), { ...newBook, show: true }];
                    patchState(store, { books });
                }
            },
            filterMasterData: rxMethod<IMasterFilter>(
                pipe(
                    debounceTime(250),
                    tap((filter: IMasterFilter) => {
                        const books = JSON.parse(JSON.stringify(store.books()));

                        books.forEach(book => {
                            book.show = true;
                            if (!isNullOrEmpty(filter.bookName) && !book.bookName.toLowerCase().startsWith(filter.bookName.toLowerCase())) {
                                book.show = false;
                            } else if (!isNullOrEmpty(filter.author) && !book.author.toLowerCase().startsWith(filter.author.toLowerCase())) {
                                book.show = false;
                            } else if (!isNullOrEmpty(filter.category) && book.category !== filter.category) {
                                book.show = false;
                            } else if (book.price < filter.priceRange[0] || book.price > filter.priceRange[1]) {
                                book.show = false;
                            }
                        });

                        patchState(store, { books });

                        if (isSet(store.selectedBook().id) && !books.find(f => f.id === store.selectedBook().id).show) {
                            patchState(store, { selectedBook: emptyBook });
                            router.navigate(['/book-management']);
                        }
                    })
                )
            )
        };
    }),
    withHooks(store => {
        const route = inject(ActivatedRoute);
        return {
            async onInit() {
                await store.getBooks();

                const paramId = route.snapshot.params['id'];
                if (paramId != undefined) {
                    await store.setSelectedBook(paramId);
                }
            }
        };
    })
);
