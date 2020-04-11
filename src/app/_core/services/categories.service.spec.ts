import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CategoriesService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [CategoriesService, HttpClient, HttpHandler]
	}));

	it('should be created', () => {
		const service: CategoriesService = TestBed.get(CategoriesService);
		expect(service).toBeTruthy();
	});
});
