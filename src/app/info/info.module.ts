import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { InfoSectionComponent } from './info-section/info-section.component';
import { CoreModule } from '../_core/core.module';

@NgModule({
	declarations: [InfoCardComponent, InfoSectionComponent],
	imports: [
		CommonModule,
		CoreModule,
	],
	exports: [InfoCardComponent, InfoSectionComponent]
})
export class InfoModule { }
