import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../book-management.interface';
import { ApiConnection } from '../../api-connection';
import { of } from 'rxjs';
import { TestBooks } from '../test-data';

@Injectable({ providedIn: 'root' })
export class BookManagementService {
    private readonly httpClient = inject(HttpClient);

    getBooks() {
        //return this.httpClient.get<IBook[]>(ApiConnection + '/books');

        return of(TestBooks);
    }

    getSelectedBook(id: string) {
      //return this.httpClient.get<IBook>(ApiConnection + `/books/${id}`);

      let book = TestBooks.find(f => f.id === id);

      if(book == undefined)
        book = TestBooks[0];

      return of(book);
    }
}
