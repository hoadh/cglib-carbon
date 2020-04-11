import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CustomersService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [CustomersService, HttpClient, HttpHandler]
	}));

	it('should be created', () => {
		const service: CustomersService = TestBed.get(CustomersService);
		expect(service).toBeTruthy();
	});
});
