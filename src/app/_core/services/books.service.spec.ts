import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResult } from '../../_models/http-result.model';
import { Book } from '../../_models/entities/book';
import { BorrowReceipt } from '../../_models/entities/borrow-receipt';

fdescribe('BooksService', () => {
	let service: BooksService;
	let httpMock: HttpTestingController;
	const apiUrl = environment.apiUrl;

	const successHttpResult: HttpResult = {
		success: true,
		data: []
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BooksService
			],
			imports: [
				HttpClientTestingModule
			]
		});
		httpMock = TestBed.get(HttpTestingController);
		service = TestBed.get(BooksService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all books from API backend', () => {
		service.getAllBooks().subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}books`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get all books of a library from API backend', () => {
		const libraryId = '1';
		service.getBooksInLibrary(libraryId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/all-books`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get available books of a library from API backend', () => {
		const libraryId = '1';
		service.getAvailableBooks(libraryId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books/borrow-status/0`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get borrowing list of a library from API backend', () => {
		const libraryId = 1;
		service.getBorrowingList(libraryId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/borrows`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get a book by id from API backend', () => {
		const libraryId = '1';
		const bookId = '1';
		service.getBookById(libraryId, bookId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books/${bookId}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should add a book with API backend', () => {
		const book: Book = {
			title: 'Test Book',
			note: 'Test Book'
		};
		service.add(book).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}books`);
		expect(req.request.method).toBe('POST');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should update a book with API backend', () => {
		const libraryId = 1;
		const bookId = 1;
		const book: Book = {
			title: 'Test Book',
			note: 'Test Book'
		};
		service.update(libraryId, bookId, book).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books/${bookId}`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should delete a book with API backend', () => {
		const libraryId = 1;
		const bookId = 1;
		service.delete(libraryId, bookId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books/${bookId}`);
		expect(req.request.method).toBe('DELETE');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should borrow a book with API backend', () => {
		const libraryId = '1';
		const books: Book[] = [{
			title: 'Test Book',
			note: 'Test Book'
		}];
		const borrowReceipt: BorrowReceipt = {
			full_name: 'Test Full Name',
			department: 'Test Department'
		};
		service.borrowBook(libraryId, books, borrowReceipt).subscribe( res => {
			expect(res).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/borrows`);
		expect(req.request.method).toBe('POST');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should send file to API backend for importing books', () => {
		const libraryId = 1;
		const formData = new FormData();
		service.importBooks(libraryId, formData).subscribe( res => {
			expect(res).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books/import`);
		expect(req.request.method).toBe('POST');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should return book with API backend', () => {
		const libraryId = 1;
		const borrowingBookId = 1;
		service.returnBook(libraryId, borrowingBookId).subscribe( res => {
			expect(res).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/borrows/${borrowingBookId}`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should filter books by fields from API backend', () => {
		const libraryId = '1';
		const filterBook: Book = {
			category_id: 1,
			status_id: 1,
			title: 'test',
			note: 'test'
		};
		const filter = 'category_id=1&status_id=1&title=test&note=test&';
		service.filterBooksByFields(libraryId, filterBook).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/books?${filter}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should filter books from API backend', () => {
		const libraryId = 1;
		const categoryId = 1;
		const statusId = 1;
		const filter = 'library_id=1&category_id=1&status_id=1&';
		service.filterBooks(libraryId, categoryId, statusId).subscribe( books => {
			expect(books).toBe(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}books/filter?${filter}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});
});
