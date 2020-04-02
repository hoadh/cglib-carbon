import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSectionComponent } from './info-section.component';
import { GridModule } from 'carbon-components-angular';
import * as data from '../info.json';

describe('InfoSectionComponent', () => {
	let component: InfoSectionComponent;
	let fixture: ComponentFixture<InfoSectionComponent>;
	let heading = data.title;
	let items = data.items;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InfoSectionComponent ],
			imports: [GridModule]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
