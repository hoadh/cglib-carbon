import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookTableComponent } from '../book-table/book-table.component';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookImportModalComponent } from '../book-import-modal/book-import-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../books-routing.module';
import { CoreModule } from '../../_core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookListComponent', () => {
	let component: BookListComponent;
	let fixture: ComponentFixture<BookListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookListComponent, BookTableComponent, BookModalComponent, BookImportModalComponent],
			imports: [
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				BooksRoutingModule,
				CoreModule,
				HttpClientTestingModule
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookListComponent);
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
