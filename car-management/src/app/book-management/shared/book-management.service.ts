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
}
