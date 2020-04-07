import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from '../../_models/http-result.model';
import { HttpBaseService } from './http-base.service';

@Injectable({
	providedIn: 'root'
})
export class CustomersService extends HttpBaseService {
	public add(libraryId: string, customer: Customer): Observable<HttpResult> {
		return this.http.post(`${this.apiUrl}libraries/${libraryId}/customers`, customer);
	}

	public getList(libraryId: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/customers`);
	}

	public getDetail(libraryId: string, customerId: string): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}libraries/${libraryId}/customers/${customerId}`);
	}

	public delete(libraryId: string, customerId: string): Observable<HttpResult> {
		return this.http.delete(`${this.apiUrl}libraries/${libraryId}/customers/${customerId}`);
	}
}
