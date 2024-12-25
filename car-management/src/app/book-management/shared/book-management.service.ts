import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../book-management.interface';
import { of } from 'rxjs';
import { TestBooks } from '../test-data';

@Injectable({ providedIn: 'root' })
export class BookManagementService {
    private readonly httpClient = inject(HttpClient);

    getBooks() {
        //return this.httpClient.get<IBook[]>(ApiConnection + '/books');

        return of(TestBooks.map(book => ({...book, show: true} as Book)));
    }

    getSelectedBook(id: string) {
      //return this.httpClient.get<IBook>(ApiConnection + `/books/${id}`);

      let book = TestBooks.find(f => f.id === id);

      if(book == undefined)
        book = TestBooks[0];

      return of(book);
    }

    deleteBook(id: string) {
      //return this.httpClient.delete<void>(ApiConnection + `/books/${id}`)

      return of(true);
    }
}
