import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Observable } from 'rxjs';
import { HttpResult } from '../../_models/http-result.model';

@Injectable()
export class BooksService extends HttpBaseService {

	public getBooksInLibrary(libraryId: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/books`);
	}

	public getAllBooks(): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}books`);
	}

	public getBookById(libraryId: string, id: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/books/${id}`);
		;
	}

	public filterBooksByFields(libraryId: string, filterBook: Book): Observable<HttpResult> {
		let filter = '';

		for (const key in filterBook) {
			if (filterBook.hasOwnProperty(key)) {
				const value = filterBook[key];
				switch (key) {
					case 'category_id':
					case 'status_id':
						if (value !== 0) {
							filter += `${key}=${value}&`;
						}
						break;
					default:
						if (value !== '') {
							filter += `${key}=${value}&`;
						}
				}
			}
		}
		const url = `${this.apiUrl}libraries/${libraryId}/books?${filter}`;
		console.log('url = ' + url);
		return this.http.get(url);
	}

	public filterBooks(libraryId: number, categoryId: number, statusId: number): Observable<HttpResult> {
		let filter = '';
		if (libraryId > 0) {
			filter += `library_id=${libraryId}&`;
		}

		if (categoryId > 0) {
			filter += `category_id=${categoryId}&`;
		}

		if (statusId > 0) {
			filter += `status_id=${statusId}&`;
		}
		return this.http.get(`${this.apiUrl}books/filter?${filter}`);
	}

	public add(book: Book): Observable<HttpResult> {
		return this.http.post(`${this.apiUrl}books`, book);
	}

	public update(libraryId: number, bookId: number, book: Book): Observable<HttpResult> {
		return this.http.put(`${this.apiUrl}libraries/${libraryId}/books/${bookId}`, book);
	}

	public delete(libraryId: number, bookId: number): Observable<HttpResult> {
		return this.http.delete(`${this.apiUrl}libraries/${libraryId}/books/${bookId}`);
	}

	public borrowBook(libraryId: string, books: Book[], borrowReceipt: BorrowReceipt): Observable<HttpResult> {
		// const borrow = {
		// 	customer_id: borrowReceipt.customer_id,
		// 	date_expected_returned: borrowReceipt.date_expected_returned,
		// 	books: books,
		// };

		const borrow = borrowReceipt;
		borrow.books = books;

		return this.http.post(`${this.apiUrl}libraries/${libraryId}/borrows`, borrow);
	}

	public getBorrowingList(libraryId: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/borrows`);
	}

	public getAvailableBooks(libraryId: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/books/borrow-status/0`);
	}

	public returnBook(libraryId: string, borrowingBookId: string, statusId: number): Observable<HttpResult> {
		const returnInfo = {
			status_book: statusId
		};
		return this.http.put(`${this.apiUrl}libraries/${libraryId}/borrows/${borrowingBookId}`, returnInfo);
	}
}
