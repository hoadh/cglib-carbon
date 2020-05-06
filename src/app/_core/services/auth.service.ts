import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { catchError, map } from 'rxjs/operators';
import { HttpResult } from 'src/app/_models/http-result.model';

@Injectable()
export class AuthService extends HttpBaseService {

	// private loggedInsubject = new Subject<any>();

	logout() {
		return this.http.post(`${this.apiUrl}logout`, { headers: this.getHeaders() }).pipe(
			map(result => {
				localStorage.clear();
				// this.loggedInsubject.next(false);
				return result;
			}, error => {
				localStorage.clear();
				// this.loggedInsubject.next(false);
				catchError(this.handleError('logout', null));
				return error;
			})
		);
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post<HttpResult>(`${this.apiUrl}login`, { username, password })
			.pipe(
				map(result => {
					let bRes;

					const isError = (result && result.status && result.status === 'error');

					if (isError) {
						bRes = false;
					} else {
						localStorage.setItem('ACCESS_TOKEN', result.data.token);
						// this.loggedInsubject.next(true);
						bRes = true;
					}
					return bRes;
				},
					catchError(error => {
						this.handleError('login', null);
						return error;
					})
				)
			);
	}

	changePassword(oldPassword: string, newPassword: string): Observable<HttpResult> {
		const pwData = new FormData();
		pwData.append('pw_old', oldPassword);
		pwData.append('pw_new', newPassword);
		return this.http.post(`${this.apiUrl}change-password`, pwData, { headers: this.getHeaders() })
			.pipe(
				catchError(this.handleError('changePassword', null))
			);
	}

	getProfile(): Observable<any> {
		return this.http.get<HttpResult>(`${this.apiUrl}me`, { headers: this.getHeaders() });
	}
}
