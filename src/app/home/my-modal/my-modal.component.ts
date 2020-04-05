import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';

@Component({
	selector: 'app-my-modal',
	templateUrl: './my-modal.component.html',
	styleUrls: ['./my-modal.component.scss']
})
export class MyModal extends BaseModal {
	label: string;
	title: string;
	text: string;

	constructor(protected injector: Injector) {
		super();
		this.label = this.injector.get('label');
		this.title = this.injector.get('title');
		this.text = this.injector.get('text');
	}
}
