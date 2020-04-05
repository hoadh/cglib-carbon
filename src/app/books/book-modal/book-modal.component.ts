import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';

@Component({
	selector: 'app-book-modal',
	templateUrl: './book-modal.component.html',
	styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent extends BaseModal {
	label: string;
	title: string;

	constructor(protected injector: Injector) {
		super();
		this.label = this.injector.get('label');
		this.title = this.injector.get('title');
	}
}
