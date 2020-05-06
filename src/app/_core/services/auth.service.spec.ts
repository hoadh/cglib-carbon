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
			let loginResponse;

			// Act
			service.login(user.username, user.password).subscribe( bRes => {
				loginResponse = bRes;
			});

			// Assert
			const req = mockBackend.expectOne({ url: `${apiUrl}login`, method: 'POST' });
			req.flush(mockLoginResponse);
			expect(loginResponse).toEqual(true);
			expect(req.request.body).toEqual(user);
			expect(localStorage.getItem('ACCESS_TOKEN')).toEqual(mockLoginResponse.data.token);
			/*
			// TODO: Refactor login method
			expect(res.status).toBe(mockLoginResponse.status);
			expect(res.data).toBeTruthy();
			expect(res.data.token).toBe(mockLoginResponse.data.token);
			*/
		});

		it('should not login with invalid credential', () => {

			// Arrange
			const user = { username: '', password: '' };
			const mockLoginResponse = {
				status: 'error'
			};
			let loginResponse;

			// Act
			service.login(user.username, user.password).subscribe( bRes => {
				loginResponse = bRes;
			});

			// Assert
			const req = mockBackend.expectOne({ url: `${apiUrl}login`, method: 'POST' });
			req.flush(mockLoginResponse);
			expect(loginResponse).toEqual(false);
			expect(req.request.body).toEqual(user);
		});
	});

	describe('#logout', () => {
		it('should make request to logout url', () => {

			// Arrange
			const mockLogoutResponse = {};
			let logoutRes;

			// Act
			service.logout().subscribe( res => {
				logoutRes = res;
			});

			// Assert
			const req = mockBackend.expectOne({ url: `${apiUrl}logout`, method: 'POST'} );
			req.flush(mockLogoutResponse);
			expect(req.request.body).toBeTruthy();
			expect(logoutRes).toBeTruthy();
			expect(localStorage.getItem('ACCESS_TOKEN')).toBeNull(); // make sure access token is cleared!
			mockBackend.verify();
		});
	});

	describe('#changePassword', () => {
		it('should change password with valid inputs', () => {
			// Arrange
			const mockResponse = {};
			const oldPassword = 'old-password';
			const newPassword = 'new-password';
			let cpRes;

			// Act
			service.changePassword(oldPassword, newPassword).subscribe( res => cpRes = res);

			// Assert
			const req = mockBackend.expectOne({ url: `${apiUrl}change-password`, method: 'POST'} );
			req.flush(mockResponse);
			expect(cpRes).toBeTruthy();
			mockBackend.verify();
		});
	});

	describe('#getProfile', () => {
		it('should make request to `me` for getting profile', () => {
			// Arrange
			const mockResponse = {};
			let profileRes;

			// Act
			service.getProfile().subscribe( res => profileRes = res);

			// Assert
			const req = mockBackend.expectOne({ url: `${apiUrl}me`, method: 'GET'});
			req.flush(mockResponse);
			expect(profileRes).toBeTruthy();
			mockBackend.verify();
		});
	});
});
