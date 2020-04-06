import { NgModule } from '@angular/core';

import {
	UIShellModule,
	ButtonModule,
	InputModule,
	DatePickerModule,
	SelectModule,
	DocumentationModule,
	GridModule,
	BreadcrumbModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
	TableModule,
	LinkModule,
	PaginationModule,
	LoadingModule,
	InlineLoadingModule,
	SearchModule,
	NotificationModule,
	PanelModule
} from 'carbon-components-angular';

const modules: any[] = [

	UIShellModule,
	ButtonModule,
	InputModule,
	DatePickerModule,
	SelectModule,
	DocumentationModule,
	GridModule,
	BreadcrumbModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
	TableModule,
	SearchModule,
	LinkModule,
	PaginationModule,
	LoadingModule,
	InlineLoadingModule,
	NotificationModule,
	PanelModule
];

@NgModule({
	imports: [...modules],
	exports: [...modules]
})
export class CarbonAngularModule { }
