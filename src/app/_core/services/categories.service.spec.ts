import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from '../../_models/entities/category';
import { HttpResult } from '../../_models/http-result.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

describe('CategoriesService', () => {
	let httpMock: HttpTestingController;
	let service: CategoriesService;

	const successHttpResult: HttpResult = {
		success: true,
		data: {}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CategoriesService],
			imports: [HttpClientTestingModule]
		});
		httpMock = TestBed.get(HttpTestingController);
		service = TestBed.get(CategoriesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add new category with API backend', () => {
		const category: Category = {
			name: 'test'
		};
		service.add(category).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}categories`);
		expect(req.request.method).toBe('POST');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should get categories list from API backend', () => {
		service.getList().subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}categories`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should update a category with API backend', () => {
		const categoryId = '1';
		const category: Category = {
			name: 'test'
		};
		service.update(categoryId, category).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}categories/${categoryId}`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});

	it('should delete a category with API backend', () => {
		const categoryId = '1';
		service.delete(categoryId).subscribe( res => {
			expect(res).toEqual(successHttpResult);
		});

		const req = httpMock.expectOne(`${apiUrl}categories/${categoryId}`);
		expect(req.request.method).toBe('DELETE');
		expect(req.request.responseType).toBe('json');

		req.flush(successHttpResult);
		httpMock.verify();
	});
});
