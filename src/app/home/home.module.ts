import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {
	BreadcrumbModule,
	ButtonModule,
	GridModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
} from 'carbon-components-angular';
import { AddModule } from '@carbon/icons-angular';
import { InfoModule } from '../info/info.module';
import { MyModal } from './my-modal/my-modal.component';

@NgModule({
	declarations: [LandingPageComponent, MyModal],
	imports: [
		CommonModule,
		HomeRoutingModule,
		ButtonModule,
		GridModule,
		BreadcrumbModule,
		TabsModule,
		InfoModule,
		ModalModule,
		PlaceholderModule,
		AddModule,
	],
	exports: [MyModal],
	entryComponents: [MyModal]
})
export class HomeModule { }
