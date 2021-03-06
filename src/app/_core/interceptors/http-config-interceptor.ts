import { Injectable } from '@angular/core';

import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

	constructor() {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem('ACCESS_TOKEN');

		if (token) {
			request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
		}

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				}
				return event;
			}));
	}

}
