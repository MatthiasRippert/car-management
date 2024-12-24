import { IBook } from './book-management.interface';

export let TestBooks: IBook[] = [
    {
        id: '6752acfb0b1eb77539accc01',
        bookName: 'Clean Code',
        price: 43.15,
        category: 'Computers',
        author: 'Robert C. Martin'
    },
    {
        id: '6752acfb0b1eb77539accc00',
        bookName: 'Design Patterns',
        price: 54.93,
        category: 'Computers',
        author: 'Ralph Johnson'
    }
];

export const PossibleBookCategories: string[] = ['Computers', 'Fantasy', 'Krimi', 'Biografie']

export function addNewBook(book: IBook){
  TestBooks = [...TestBooks, book];
}
