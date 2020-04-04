import { NgModule } from '@angular/core';

import {
	UIShellModule,
	ButtonModule,
	InputModule,
	DocumentationModule,
	GridModule,
	BreadcrumbModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
	TableModule,
	LinkModule,
	PaginationModule
} from 'carbon-components-angular';

const modules: any[] = [

	UIShellModule,
	ButtonModule,
	InputModule,
	DocumentationModule,
	GridModule,
	BreadcrumbModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
	TableModule,
	LinkModule,
	PaginationModule
];

@NgModule({
	imports: [...modules],
	exports: [...modules]
})
export class CarbonAngularModule { }
