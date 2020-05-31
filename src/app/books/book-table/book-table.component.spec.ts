import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableComponent } from './book-table.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../_core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksService } from '../../_core/services/books.service';

describe('BookTableComponent', () => {
	let component: BookTableComponent;
	let fixture: ComponentFixture<BookTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookTableComponent],
			imports: [
				CommonModule,
				CoreModule,
				HttpClientTestingModule
			],
			providers: [BooksService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookTableComponent);
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
