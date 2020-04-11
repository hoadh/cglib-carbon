import { TestBed } from '@angular/core/testing';

import { HttpBaseService } from './http-base.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HttpBaseService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [HttpBaseService, HttpClient, HttpHandler]
	}));

	it('should be created', () => {
		const service: HttpBaseService = TestBed.get(HttpBaseService);
		expect(service).toBeTruthy();
	});
});
