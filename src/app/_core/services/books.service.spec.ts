import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BooksService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [BooksService, HttpClient, HttpHandler]
	}));

	it('should be created', () => {
		const service: BooksService = TestBed.get(BooksService);
		expect(service).toBeTruthy();
	});
});
