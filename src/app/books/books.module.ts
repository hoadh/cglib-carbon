import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { CoreModule } from '../_core/core.module';
import { BookTableComponent } from './book-table/book-table.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookImportModalComponent } from './book-import-modal/book-import-modal.component';


@NgModule({
	declarations: [BookListComponent, BookTableComponent, BookModalComponent, BookImportModalComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BooksRoutingModule,
		CoreModule,
	],
	entryComponents: [BookModalComponent, BookImportModalComponent]
})
export class BooksModule {
}
