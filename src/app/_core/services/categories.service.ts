import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Observable } from 'rxjs';
import { HttpResult } from '../../_models/http-result.model';

@Injectable()
export class CategoriesService extends HttpBaseService{
	public add(category: any): Observable<HttpResult> {
		return this.http.post(`${this.apiUrl}categories`, category);
	}

	public getList(): Observable<HttpResult> {
		return this.http.get(`${this.apiUrl}categories`);
	}

	public update(categoryId: string, category: any): Observable<HttpResult> {
		return this.http.put(`${this.apiUrl}categories/${categoryId}`, category);
	}

	public delete(categoryId: string): Observable<HttpResult> {
		return this.http.delete(`${this.apiUrl}categories/${categoryId}`);
	}
}
