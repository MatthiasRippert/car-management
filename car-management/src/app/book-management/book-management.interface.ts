import { FormControl } from '@angular/forms';

export interface IBookManagementState {
    books: Book[];
    selectedBook: IBookResponse;
    loadingFlags: Flag;
    showFlags: Flag;
    editMode: boolean;
}

export interface IBookResponse {
    id: string;
    bookName: string;
    price: number;
    category: string;
    author: string;
}

export interface IAddBookFrom extends Omit<IBookResponse, 'id'> {}

export interface IMasterFilter {
    bookName: string;
    priceRange: number[];
    category: string;
    author: string;
}

export type Flag = { [key: string]: boolean };
export type WrappedFormControls<T> = { [k in keyof T]: FormControl<T[k]> };
export type Book = IBookResponse & { show: boolean };
