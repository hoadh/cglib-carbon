import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowsRoutingModule } from './borrows-routing.module';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowAddComponent } from './borrow-add/borrow-add.component';
import { CoreModule } from '../_core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectBookTableComponent } from './select-book-table/select-book-table.component';

import { CaretRight16Module } from '@carbon/icons-angular/lib/caret--right/16';

@NgModule({
	declarations: [BorrowListComponent, BorrowAddComponent, SelectBookTableComponent],
	imports: [
		CommonModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		BorrowsRoutingModule,
		CaretRight16Module
	]
})
export class BorrowsModule {
}
