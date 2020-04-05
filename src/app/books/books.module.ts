import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { CoreModule } from '../_core/core.module';
import { BookTableComponent } from './book-table/book-table.component';
import { BookModalComponent } from './book-modal/book-modal.component';


@NgModule({
	declarations: [BookListComponent, BookTableComponent, BookModalComponent],
	imports: [
		CommonModule,
		BooksRoutingModule,
		CoreModule,
	],
	entryComponents: [BookModalComponent]
})
export class BooksModule {
}
