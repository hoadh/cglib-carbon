import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseModal } from 'carbon-components-angular';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-book-import-modal',
	templateUrl: './book-import-modal.component.html',
	styleUrls: ['./book-import-modal.component.scss']
})
export class BookImportModalComponent extends BaseModal {
	downloadUrl = environment.apiUrl + 'download-excel-sample';
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
			if (!fileObj['uploaded']) {
				this.onSave(fileObj['file']);
			}
		});
	}

}
