import { FormControl } from '@angular/forms';

export interface IBookManagementState {
    books: IBook[];
    selectedBook: IBook;
    loadingFlags: Flag;
    showFlags: Flag;
    editMode: boolean;
}

export interface IBook {
    id: string;
    bookName: string;
    price: number;
    category: string;
    author: string;
}

export type Flag = {[key: string]: boolean};
export type WrappedFormControls<T> = { [k in keyof T]: FormControl<T[k]> };
