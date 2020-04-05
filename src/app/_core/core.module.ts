import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarbonAngularModule } from '../carbon-angular.module';
import { CarbonIconsModule } from '../carbon-icons.module';
import { AuthService } from './services/auth.service';
import { BookStatusComponent } from './components/book-status/book-status.component';
import { BooksService } from './services/books.service';
import { CategoriesService } from './services/categories.service';

@NgModule({
	declarations: [BookStatusComponent],
	imports: [
		CommonModule,
		CarbonAngularModule,
		CarbonIconsModule
	],
	providers: [
		AuthService,
		BooksService,
		CategoriesService
	],
	exports: [
		CarbonAngularModule,
		CarbonIconsModule,
		BookStatusComponent
	]
})
export class CoreModule { }
