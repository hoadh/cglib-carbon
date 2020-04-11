import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutComponent } from './site-layout.component';
import { HeaderComponent } from '../../header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../_core/core.module';

describe('SiteLayoutComponent', () => {
	let component: SiteLayoutComponent;
	let fixture: ComponentFixture<SiteLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SiteLayoutComponent, HeaderComponent],
			imports: [
				BrowserModule,
				BrowserAnimationsModule,
				AppRoutingModule,
				CoreModule,
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SiteLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
