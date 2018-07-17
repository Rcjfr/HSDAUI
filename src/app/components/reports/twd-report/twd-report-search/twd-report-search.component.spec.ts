import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwdReportSearchComponent } from './twd-report-search.component';

describe('TwdReportSearchComponent', () => {
  let component: TwdReportSearchComponent;
  let fixture: ComponentFixture<TwdReportSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwdReportSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwdReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
