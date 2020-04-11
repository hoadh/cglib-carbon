import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableComponent } from './book-table.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../_core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookTableComponent', () => {
	let component: BookTableComponent;
	let fixture: ComponentFixture<BookTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookTableComponent],
			imports: [
				CommonModule,
				CoreModule,
				HttpClientTestingModule
			],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
