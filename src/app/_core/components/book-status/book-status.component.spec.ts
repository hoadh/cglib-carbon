import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStatusComponent } from './book-status.component';

describe('BookStatusComponent', () => {
	let component: BookStatusComponent;
	let fixture: ComponentFixture<BookStatusComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookStatusComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
