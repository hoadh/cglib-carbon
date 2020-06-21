import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResult } from '../../_models/http-result.model';
import { Customer } from '../../_models/entities/customer';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

describe('CustomersService', () => {
	let httpMock: HttpTestingController;
	let service: CustomersService;

	const successHttpResult: HttpResult = {
		success: true,
		data: {}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CustomersService],
			imports: [HttpClientTestingModule]
		});
		httpMock = TestBed.get(HttpTestingController);
		service = TestBed.get(CustomersService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add new customer with API backend', () => {
		const libraryId = '1';
		const customer: Customer = {
			full_name: 'test'
		};
		service.add(libraryId, customer).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/customers`);
		expect(req.request.method).toBe('POST');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get customers list from API backend', () => {
		const libraryId = '1';
		service.getList(libraryId).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/customers`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get detail of customer from API backend', () => {
		const libraryId = '1';
		const customerId = '1';
		service.getDetail(libraryId, customerId).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/customers/${customerId}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should delete a customer with API backend', () => {
		const libraryId = '1';
		const customerId = '1';
		service.delete(libraryId, customerId).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}libraries/${libraryId}/customers/${customerId}`);
		expect(req.request.method).toBe('DELETE');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});
});
