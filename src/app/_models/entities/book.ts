import { Category } from './category';

export interface Book {
	id?: number;
	title: string;
	authors?: string;
	category_id?: number;
	category?: Category;
	library_id?: number;
	status_id?: number;
	note: string;
	checked?: boolean; // using in borrow feature
}
