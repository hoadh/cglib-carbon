import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {
	InputModule, DocumentationModule,
	ButtonModule,
	GridModule,
} from 'carbon-components-angular';

import { ChevronRightGlyphModule, ArrowRightModule } from '@carbon/icons-angular';


@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ButtonModule,
		GridModule,
		InputModule, DocumentationModule,
		ChevronRightGlyphModule, ArrowRightModule
	]
})
export class AuthModule { }
