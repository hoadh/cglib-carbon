import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookImportModalComponent } from './book-import-modal.component';
import { CoreModule } from '../../_core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookImportModalComponent', () => {
	let component: BookImportModalComponent;
	let fixture: ComponentFixture<BookImportModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookImportModalComponent],
			imports: [
				CoreModule,
				NoopAnimationsModule
			],
			providers: [
				{ provide: 'onSave', useValue: () => {}  /*do nothing*/ }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookImportModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
