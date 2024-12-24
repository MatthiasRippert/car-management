export interface IBookManagementState {
    books: IBook[];
    selectedBook: IBook;
    loading: boolean;
}

export interface IBook {
    id: string;
    bookName: string;
    price: number;
    category: string;
    author: string;
}
