import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

fdescribe('AuthService', () => {
	let service: AuthService;
	let httpMock: HttpTestingController;
	const apiUrl = environment.apiUrl;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [AuthService]
		});
		service = TestBed.get(AuthService);
		httpMock = TestBed.get(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#login', () => {
		it('should login with valid username and password', () => {

			// Arrange
			const user = { username: 'username', password: 'password' };
			const mockLoginResponse = {
				status: 'success',
				data: { token: 'TEST_ACCESS_TOKEN' }
			};

			// Act && Assert
			service.login(user.username, user.password).subscribe( bRes => {
				expect(bRes).toBeTruthy();
				// TODO: Refactor login method
				// expect(res.status).toBe(mockLoginResponse.status);
				// expect(res.data).toBeTruthy();
				// expect(res.data.token).toBe(mockLoginResponse.data.token);
			});

			const req = httpMock.expectOne(`${apiUrl}login`);
			expect(req.request.method).toBe('POST');
			expect(req.request.body).toEqual(user);
			req.flush(mockLoginResponse);
		});
	});
});
