import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { CoreModule } from '../_core/core.module';
import { BookTableComponent } from './book-table/book-table.component';
import { AddModule, EditModule, TrashCanModule, DotMarkModule } from '@carbon/icons-angular';


@NgModule({
	declarations: [BookListComponent, BookTableComponent],
	imports: [
		CommonModule,
		BooksRoutingModule,
		CoreModule,
		AddModule,
		EditModule,
		TrashCanModule,
		DotMarkModule
	]
})
export class BooksModule {
}
