import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModal } from './my-modal.component';
import { ModalModule } from 'carbon-components-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('MyModalComponent', () => {
	let component: MyModal;
	let fixture: ComponentFixture<MyModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyModal],
			imports: [ModalModule, NoopAnimationsModule],
			providers: [
				{provide: 'label', useValue: 'label'},
				{provide: 'title', useValue: 'title'},
				{provide: 'text', useValue: 'text'},
			]
		}).compileComponents();
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
