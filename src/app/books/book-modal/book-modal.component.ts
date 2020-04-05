import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { CategoriesService } from '../../_core/services/categories.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResult } from '../../_models/http-result.model';

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
	bookForm: FormGroup;
	isProcessing = false;

	constructor(
		@Inject('label') label: string,
		@Inject('title') title: string,
		@Inject('categories') categories: Category[],
		@Inject('onSave') onSave: Function | undefined,
	) {
		super();
		this.label = label;
		this.title = title;
		this.categories = categories;
		this.onSave = onSave;
		// this.save = save;
		this.bookForm = new FormGroup({
			title: new FormControl(''),
			authors: new FormControl(''),
			category_id: new FormControl(''),
			note: new FormControl(''),
		});
	}

	doSave() {
		if (this.onSave != undefined && this.onSave instanceof Function) {
			this.isProcessing = true;
			this.onSave(this.bookForm.value);
		}
	}



}
