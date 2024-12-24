import { Component, effect, inject, OnInit, untracked } from '@angular/core';
import { BookManagementStore } from '../book-management.store';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBook, WrappedFormControls } from '../book-management.interface';
import { PossibleBookCategories } from '../test-data';
import { Select } from 'primeng/select';

@Component({
  standalone: true,
  selector: 'book-management-detail',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: 'book-management-detail.component.html'
})
export class BookManagementDetailComponent implements OnInit {
    private readonly store = inject(BookManagementStore);

    selectedBook = this.store.selectedBook;
    editMode = this.store.editMode;

    formGroup: FormGroup<WrappedFormControls<IBook>> = new FormGroup({
      bookName: new FormControl<string>(undefined),
      category: new FormControl<string>(undefined),
      author: new FormControl<string>(undefined),
      price: new FormControl<number>(undefined),
      id: new FormControl<string>({value: undefined, disabled: true}),
    })

    possibleCategories = PossibleBookCategories;

    constructor() {
      effect(() => {
        const selectedBook = this.store.selectedBook();

        untracked(() => {
          this.formGroup.patchValue({...selectedBook});
          this.formGroup.disable();
        })
      });

      effect(() => {
        const editMode = this.editMode();

        untracked(() => {
          if(editMode){
            this.formGroup.enable();
            this.formGroup.controls.id.disable();
          }
          else{
            this.formGroup.disable();
          }
        })
      });
    }

    ngOnInit() {}

    startEditMode(){
      this.store.startEditMode();
    }

    stopEditMode(){
      this.store.stopEditMode();
    }

    saveBook() {
      this.store.saveBook(this.formGroup.getRawValue() as IBook);
    }

    showAddBookDialog(){
        this.store.showAddBookDialog();
    }
}
