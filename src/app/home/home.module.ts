import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InfoModule } from '../info/info.module';
import { MyModal } from './my-modal/my-modal.component';
import { CoreModule } from '../_core/core.module';

@NgModule({
	declarations: [LandingPageComponent, MyModal],
	imports: [

	CommonModule,
		HomeRoutingModule,
		CoreModule,
		InfoModule,
	],
	exports: [MyModal],
	entryComponents: [MyModal]
})
export class HomeModule { }
