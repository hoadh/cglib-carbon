import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookTableComponent } from './select-book-table.component';

describe('BorrowTableComponent', () => {
	let component: SelectBookTableComponent;
	let fixture: ComponentFixture<SelectBookTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectBookTableComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectBookTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
