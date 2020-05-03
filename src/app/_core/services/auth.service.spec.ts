import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
	let service: AuthService;
	let mockBackend: HttpTestingController;
	const apiUrl = environment.apiUrl;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [AuthService]
		});
		service = TestBed.get(AuthService);
		mockBackend = TestBed.get(HttpTestingController);
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#login', () => {
		it('should login with valid credential', () => {

			// Arrange
			const user = { username: 'username', password: 'password' };
			const mockLoginResponse = {
				status: 'success',
				data: { token: 'TEST_ACCESS_TOKEN' }
			};

			// Act && Assert
			service.login(user.username, user.password).subscribe( bRes => {
				expect(bRes).toEqual(true);
				expect(localStorage.getItem('ACCESS_TOKEN')).toEqual(mockLoginResponse.data.token);

				// TODO: Refactor login method
				// expect(res.status).toBe(mockLoginResponse.status);
				// expect(res.data).toBeTruthy();
				// expect(res.data.token).toBe(mockLoginResponse.data.token);
			});

			const req = mockBackend.expectOne(`${apiUrl}login`);
			expect(req.request.method).toBe('POST');
			expect(req.request.body).toEqual(user);
			req.flush(mockLoginResponse);
		});

		it('should not login with invalid credential', () => {

			// Arrange
			const user = { username: '', password: '' };
			const mockLoginResponse = {
				status: 'error'
			};

			// Act && Assert
			service.login(user.username, user.password).subscribe( bRes => {
				expect(bRes).toEqual(false);
			});

			const req = mockBackend.expectOne(`${apiUrl}login`);
			req.flush(mockLoginResponse);
			expect(req.request.method).toBe('POST');
			expect(req.request.body).toEqual(user);
		});
	});

	describe('#logout', () => {
		it('should make request to logout url', () => {
			const mockLogoutResponse = {};

			service.logout().subscribe( res => {
				expect(res).toBeTruthy();
				expect(localStorage.getItem('ACCESS_TOKEN')).toBeNull(); // make sure access token is cleared!
			});

			const req = mockBackend.expectOne({ url: `${apiUrl}logout`, method: 'POST'} );
			req.flush(mockLogoutResponse);
			expect(req.request.body).toBeTruthy();
			mockBackend.verify();
		});
	});
});
