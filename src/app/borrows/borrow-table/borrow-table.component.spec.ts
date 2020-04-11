import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowTableComponent } from './borrow-table.component';
import { CoreModule } from '../../_core/core.module';
import { BorrowListComponent } from '../borrow-list/borrow-list.component';
import { BorrowAddComponent } from '../borrow-add/borrow-add.component';
import { SelectBookTableComponent } from '../select-book-table/select-book-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BorrowTableComponent', () => {
	let component: BorrowTableComponent;
	let fixture: ComponentFixture<BorrowTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BorrowListComponent, BorrowAddComponent, SelectBookTableComponent, BorrowTableComponent],
			imports: [
				CommonModule,
				CoreModule,
				FormsModule,
				ReactiveFormsModule,
				HttpClientTestingModule,
				RouterTestingModule,
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BorrowTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
