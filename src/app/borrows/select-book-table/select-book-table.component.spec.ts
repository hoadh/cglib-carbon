import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookTableComponent } from './select-book-table.component';
import { BorrowTableComponent } from '../borrow-table/borrow-table.component';
import { CoreModule } from '../../_core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BorrowTableComponent', () => {
	let component: SelectBookTableComponent;
	let fixture: ComponentFixture<SelectBookTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectBookTableComponent],
			imports: [
				CoreModule,
				HttpClientTestingModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectBookTableComponent);
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
