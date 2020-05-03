import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowListComponent } from './borrow-list.component';
import { BorrowAddComponent } from '../borrow-add/borrow-add.component';
import { SelectBookTableComponent } from '../select-book-table/select-book-table.component';
import { BorrowTableComponent } from '../borrow-table/borrow-table.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../_core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrowsRoutingModule } from '../borrows-routing.module';
import { CaretRight16Module } from '@carbon/icons-angular/lib/caret--right/16';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BorrowListComponent', () => {
	let component: BorrowListComponent;
	let fixture: ComponentFixture<BorrowListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BorrowListComponent, BorrowAddComponent, SelectBookTableComponent, BorrowTableComponent],
			imports: [
				CommonModule,
				CoreModule,
				FormsModule,
				ReactiveFormsModule,
				BorrowsRoutingModule,
				CaretRight16Module,
				HttpClientTestingModule,
				RouterTestingModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BorrowListComponent);
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
