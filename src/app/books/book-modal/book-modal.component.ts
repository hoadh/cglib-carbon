import { Component, Inject } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../_models/entities/category';
import { Book } from '../../_models/entities/book';

@Component({
	selector: 'app-book-modal',
	templateUrl: './book-modal.component.html',
	styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent extends BaseModal {
	label: string;
	title: string;
	categories: Category[] = [];
	onSave: Function | any;
	secondaryLabel: string;
	onSecondary: Function | any;
	bookForm: FormGroup;
	isProcessing = false;
	book: Book | undefined;

	constructor(
		@Inject('label') label: string,
		@Inject('title') title: string,
		@Inject('book') book: Book | undefined,
		@Inject('categories') categories: Category[],
		@Inject('onSave') onSave: Function | undefined,
		@Inject('secondaryLabel') secondaryLabel: string | undefined,
		@Inject('doSecondary') doSecondary: Function | undefined,
	) {
		super();
		this.label = label;
		this.title = title;
		this.categories = categories;
		this.onSave = onSave;
		this.secondaryLabel = (secondaryLabel) ? secondaryLabel : 'Huỷ';
		this.onSecondary = doSecondary;

		this.bookForm = new FormGroup({
			title: new FormControl(''),
			authors: new FormControl(''),
			category_id: new FormControl(''),
			note: new FormControl(''),
		});

		this.book = book;
		if (this.book !== undefined) {
			this.bookForm.controls.title.setValue(this.book.title);
			this.bookForm.controls.authors.setValue(this.book.authors);
			if (this.book.category) {
				this.bookForm.controls.category_id.setValue(this.book.category.id);
			}
			this.bookForm.controls.note.setValue(this.book.note);
		}
	}

	doSave() {
		if (this.onSave != undefined && this.onSave instanceof Function) {
			this.isProcessing = true;
			this.onSave(this.bookForm.value);
		}
	}

	doSecondary() {
		if (this.onSecondary != undefined && this.onSecondary instanceof Function) {
			this.onSecondary();
		}
		this.closeModal();
	}



}
