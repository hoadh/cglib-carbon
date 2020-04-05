import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarbonAngularModule } from '../carbon-angular.module';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		CarbonAngularModule
	],
	providers: [AuthService],
	exports: [CarbonAngularModule]
})
export class CoreModule { }
