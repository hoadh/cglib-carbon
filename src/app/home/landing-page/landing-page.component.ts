import { Component, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { MyModal } from '../my-modal/my-modal.component';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

	constructor(private modalService: ModalService) { }

	ngOnInit() {
	}

	openModal() {
		this.modalService.create({
			component: MyModal,
			inputs: {
				modalTitle: '',
				modalHeading: 'What is Carbon?',
				modalText: `Carbon is IBM’s open-source design system
				for digital products and experiences. With
				the IBM Design Language as its foundation,
				the system consists of working code, design
				tools and resources, human interface
				guidelines, and a vibrant community of
				contributors.`,
			}
			});
	}

}
