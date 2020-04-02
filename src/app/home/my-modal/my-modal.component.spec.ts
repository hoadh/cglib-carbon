import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModal } from './my-modal.component';
import {
	ModalModule,
	PlaceholderModule,
} from 'carbon-components-angular';
import { Injector } from '@angular/core';

describe('MyModalComponent', () => {
	let component: MyModal;
	let fixture: ComponentFixture<MyModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyModal],
			imports: [ModalModule, PlaceholderModule ],
			providers: [{provide: 'modalText', useValue: 'test'}]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
