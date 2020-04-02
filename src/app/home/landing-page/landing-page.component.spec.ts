import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { InfoSectionComponent } from '../../info/info-section/info-section.component';
import {
	BreadcrumbModule,
	ButtonModule,
	GridModule,
	TabsModule,
	ModalModule,
	PlaceholderModule,
} from 'carbon-components-angular';

describe('LandingPageComponent', () => {
	let component: LandingPageComponent;
	let fixture: ComponentFixture<LandingPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LandingPageComponent, InfoSectionComponent ],
			imports: [BreadcrumbModule,
				ButtonModule,
				GridModule,
				TabsModule,
				ModalModule,
				PlaceholderModule,
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
