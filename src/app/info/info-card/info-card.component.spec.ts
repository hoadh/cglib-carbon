import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardComponent } from './info-card.component';
import * as data from '../info.json';
import { InfoSectionComponent } from '../info-section/info-section.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../_core/core.module';

describe('InfoCardComponent', () => {
	let component: InfoCardComponent;
	let fixture: ComponentFixture<InfoCardComponent>;
	const heading = data.title;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				InfoCardComponent,
				InfoSectionComponent
			],
			imports: [
				CommonModule,
				CoreModule,
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoCardComponent);
		component = fixture.componentInstance;
		component.heading = heading;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
