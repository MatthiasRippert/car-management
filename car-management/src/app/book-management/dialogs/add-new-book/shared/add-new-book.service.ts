import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addNewBook, TestBooks } from '../../../test-data';
import { catchError, map, of } from 'rxjs';
import { Book, IAddBookFrom, IBookResponse } from '../../../book-management.interface';

@Injectable()
export class AddNewBookService {
    private readonly httpClient = inject(HttpClient);

    addNewBook(book: IAddBookFrom) {
        //TODO: Request schicken

        const newBook: IBookResponse = { id: '6752acfb0b1eb77539accc03', ...book };
        addNewBook(newBook);

        return of(newBook);
    }
}
