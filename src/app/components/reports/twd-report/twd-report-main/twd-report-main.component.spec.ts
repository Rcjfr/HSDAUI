import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwdReportMainComponent } from './twd-report-main.component';

describe('TwdReportMainComponent', () => {
  let component: TwdReportMainComponent;
  let fixture: ComponentFixture<TwdReportMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwdReportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwdReportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
