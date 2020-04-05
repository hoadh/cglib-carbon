import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarbonAngularModule } from '../carbon-angular.module';
import { AuthService } from './services/auth.service';
import { BookStatusComponent } from './components/book-status/book-status.component';
import { DotMarkModule } from '@carbon/icons-angular';

@NgModule({
	declarations: [BookStatusComponent],
	imports: [
		CommonModule,
		CarbonAngularModule,
		DotMarkModule
	],
	providers: [AuthService],
	exports: [CarbonAngularModule, BookStatusComponent]
})
export class CoreModule { }
