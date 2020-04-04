import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { CoreModule } from '../core/core.module';
import { BookTableComponent } from './book-table/book-table.component';
import { AddModule, EditModule, TrashCanModule } from '@carbon/icons-angular';


@NgModule({
	declarations: [BookListComponent, BookTableComponent],
	imports: [
		CommonModule,
		BooksRoutingModule,
		CoreModule,
		AddModule,
		EditModule,
		TrashCanModule
	]
})
export class BooksModule {
}
