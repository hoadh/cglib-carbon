import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseModal } from 'carbon-components-angular';

@Component({
	selector: 'app-book-import-modal',
	templateUrl: './book-import-modal.component.html',
	styleUrls: ['./book-import-modal.component.scss']
})
export class BookImportModalComponent extends BaseModal {
	onSave: Function | any;
	isProcessing = false;
	files = new Set();

	constructor(
		@Inject('onSave') onSave: Function | undefined,
	) {
		super();
		this.onSave = onSave;
	}

	doImport() {
		this.isProcessing = true;
		this.files.forEach(fileObj => {
			console.log(fileObj);
			if (!fileObj['uploaded']) {
				console.log(fileObj['file']);
			}
		});
	}

}
