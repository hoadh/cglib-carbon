import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { HeaderComponent } from '../../header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../_core/core.module';

describe('AppLayoutComponent', () => {
	let component: AppLayoutComponent;
	let fixture: ComponentFixture<AppLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppLayoutComponent, HeaderComponent],
			imports: [
				BrowserModule,
				BrowserAnimationsModule,
				AppRoutingModule,
				CoreModule,
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
