import { Component, computed, effect, inject, OnInit, untracked } from '@angular/core';
import { BookManagementStore } from '../book-management.store';
import { Book, IMasterFilter, WrappedFormControls } from '../book-management.interface';
import { PossibleBookCategories } from '../test-data';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Slider } from 'primeng/slider';
import { filter, Observable, of, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookManagementComponent } from '../book-management.component';

@Component({
    standalone: true,
    selector: 'book-management-master',
    imports: [ReactiveFormsModule, Select, FormsModule, Slider],
    templateUrl: 'book-management-master.component.html'
})
export class BookManagementMasterComponent {
    private readonly store = inject(BookManagementStore);

    books = this.store.books;
    selectedBook = this.store.selectedBook;

    possibleCategories = PossibleBookCategories;

    filterFormGroup = new FormGroup<WrappedFormControls<IMasterFilter>>({
        bookName: new FormControl<string>(undefined),
        priceRange: new FormControl<number[]>([0, 0]),
        author: new FormControl<string>(undefined),
        category: new FormControl<string>(undefined)
    });

    highestPrice = computed(() => Math.ceil(Math.max(...this.books().map(m => m.price))));
    lowestPrice = computed(() => Math.floor(Math.min(...this.books().map(m => m.price))));

    constructor() {
        of(this.books())
            .pipe(
                takeUntilDestroyed(),
                filter(books => books.length > 0),
                take(1),
                tap(books => {
                    const prices = books.map(book => book.price);

                    const lowestPrice = Math.floor(Math.min(...prices));
                    const highestPrice = Math.ceil(Math.max(...prices));

                    this.filterFormGroup.controls.priceRange.setValue([lowestPrice, highestPrice]);
                })
            )
            .subscribe();

        this.store.filterMasterData(this.filterFormGroup.valueChanges as Observable<IMasterFilter>);
    }

    bookSelected(book: Book) {
        this.store.setSelectedBook(book.id);
    }

    priceRangeChanged(value: number, filter: 'min' | 'max') {
        const currentRanges = this.filterFormGroup.value.priceRange;

        if (filter === 'min') currentRanges[0] = value;
        else currentRanges[1] = value;

        this.filterFormGroup.controls.priceRange.setValue(currentRanges);
    }
}
