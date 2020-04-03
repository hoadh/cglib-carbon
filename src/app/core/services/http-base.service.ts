import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class HttpBaseService {
	protected apiUrl = environment.apiUrl;
	protected uploadUrl = environment.uploadUrl;
	constructor(
		public http: HttpClient
	) { }

	public static log(message: string) {
		console.log(message);
		console.log(JSON.stringify(message));
	}

	// public static handleResult<T>(result?: T) {
	// 	return result;
	// }

	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			const message = `${operation} failed: ${error}`;
			HttpBaseService.log(message);

			return of(result as T);
		};
	}

	public getHeaders(): HttpHeaders {
		const token = localStorage.getItem('ACCESS_TOKEN');
		let headers = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + token);
		return headers;
	}
}
