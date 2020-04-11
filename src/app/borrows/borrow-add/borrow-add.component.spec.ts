import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowAddComponent } from './borrow-add.component';
import { CoreModule } from '../../_core/core.module';
import { BorrowListComponent } from '../borrow-list/borrow-list.component';
import { SelectBookTableComponent } from '../select-book-table/select-book-table.component';
import { BorrowTableComponent } from '../borrow-table/borrow-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrowsRoutingModule } from '../borrows-routing.module';
import { CaretRight16Module } from '@carbon/icons-angular/lib/caret--right/16';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BorrowAddComponent', () => {
	let component: BorrowAddComponent;
	let fixture: ComponentFixture<BorrowAddComponent>;

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
				HttpClientTestingModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BorrowAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
