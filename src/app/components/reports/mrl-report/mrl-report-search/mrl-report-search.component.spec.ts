import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrlReportSearchComponent } from './mrl-report-search.component';

describe('MrlReportSearchComponent', () => {
  let component: MrlReportSearchComponent;
  let fixture: ComponentFixture<MrlReportSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrlReportSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrlReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
