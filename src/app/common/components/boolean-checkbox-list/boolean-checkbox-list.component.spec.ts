import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCheckboxListComponent } from './boolean-checkbox-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BooleanCheckboxListComponent', () => {
  let component: BooleanCheckboxListComponent;
  let fixture: ComponentFixture<BooleanCheckboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanCheckboxListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
