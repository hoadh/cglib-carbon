import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookImportModalComponent } from './book-import-modal.component';

describe('BookImportModalComponent', () => {
  let component: BookImportModalComponent;
  let fixture: ComponentFixture<BookImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
