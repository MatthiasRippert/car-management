import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAddBookForm } from '../add-new-book-dialog.interface';
import { addNewBook, TestBooks } from '../../../test-data';
import { catchError, map, of } from 'rxjs';
import { IBook } from '../../../book-management.interface';

@Injectable()
export class AddNewBookService {
  private readonly httpClient = inject(HttpClient);

  addNewBook(book: IAddBookForm){
    //TODO: Request schicken

    const newBook: IBook = {id: '6752acfb0b1eb77539accc03', ...book};
    addNewBook(newBook);

    return of(newBook);
  }
}
