import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModalComponent } from './book-modal.component';
import { CoreModule } from '../../_core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from '../book-list/book-list.component';
import { BookTableComponent } from '../book-table/book-table.component';
import { BookImportModalComponent } from '../book-import-modal/book-import-modal.component';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from '../books-routing.module';
import { Book } from '../../_models/entities/book';
import { Category } from '../../_models/entities/category';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookModalComponent', () => {
	let component: BookModalComponent;
	let fixture: ComponentFixture<BookModalComponent>;
	const category: Category = {
		id: 1,
		name: 'book category'
	}
	const book: Book = {
		id: 1,
		title: '',
		authors: '',
		category_id: 1,
		category: category,
		library_id: 1,
		status_id: 1,
		note: '',
		checked: true
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookListComponent, BookTableComponent, BookModalComponent, BookImportModalComponent],
			imports: [
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				BooksRoutingModule,
				CoreModule,
				BrowserAnimationsModule
			],
			providers: [
				{ provide: 'label', useValue: 'modal label' },
				{ provide: 'title', useValue: 'modal title' },
				{ provide: 'book', useValue: book },
				{ provide: 'categories', useValue: [category] },
				{ provide: 'onSave', useValue: () => {} },
				{ provide: 'secondaryLabel', useValue: 'modal secondaryLabel' },
				{ provide: 'doSecondary', useValue: () => {} },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
