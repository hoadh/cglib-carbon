import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';

@Component({
	selector: 'app-my-modal',
	templateUrl: './my-modal.component.html',
	styleUrls: ['./my-modal.component.scss']
})
export class MyModal extends BaseModal {
	modalTitle: string;
	modalHeading: string;
	modalText: string;

	constructor(protected injector: Injector) {
		super();
		this.modalTitle = this.injector.get('modalTitle');
		this.modalHeading = this.injector.get('modalHeading');
		this.modalText = this.injector.get('modalText');
	}
}
