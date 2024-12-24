import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { IBook, IBookManagementState } from './book-management.interface';
import { inject } from '@angular/core';
import { BookManagementService } from './shared/book-management.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

const initialState: IBookManagementState = {
    books: [],
    loadingFlags: {
      books: false,
      selectedBook: false
    },
    selectedBook: {
        bookName: '',
        author: '',
        category: '',
        price: 0,
        id: ''
    },
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

        return {
            async getBooks() {
                patchState(store, { loadingFlags: {...store.loadingFlags(), books: true} });
                const books = await firstValueFrom(bookService.getBooks());
                patchState(store, { loadingFlags: {...store.loadingFlags(), books: false}, books });
            },
            async setSelectedBook(id: string) {
                if(store.editMode()){
                  messageService.add({severity: 'warn', detail: 'Zum wechseln, Änderungsmodus verlassen'});
                  return
                }

                patchState(store, { loadingFlags: {...store.loadingFlags(), selectedBook: true} });
                const selectedBook = await firstValueFrom(bookService.getSelectedBook(id));
                patchState(store, { loadingFlags: {...store.loadingFlags(), selectedBook: false}, selectedBook });

                router.navigate(['/book-management', selectedBook.id]);
            },
            startEditMode(){
              patchState(store, {editMode: true});
            },
            stopEditMode(){
              patchState(store, {editMode: false});
            },
            saveBook(book: IBook) {
              let books = [...store.books()];
              let index = books.findIndex(f => f.id === book.id);

              if(index > -1){
                books[index] = book;
              }

              patchState(store, {books, selectedBook: book, editMode: false});
            },
            showAddBookDialog(){
              patchState(store, {showFlags: {...store.showFlags(), showAddDialog: true}});
            },
            closeAddBookDialog(newBook: IBook){
              patchState(store, {showFlags: {...store.showFlags(), showAddDialog: false}});

              if(newBook != undefined){
                let books = [...store.books(), newBook];
                patchState(store, {books})
              }
            }
        };
    }),
    withHooks(store => {
        const route = inject(ActivatedRoute);
        return {
            async onInit() {
                await store.getBooks();

                const paramId = route.snapshot.params['id'];
                if(paramId != undefined){
                    await store.setSelectedBook(paramId);
                }
            }
        };
    })
);
