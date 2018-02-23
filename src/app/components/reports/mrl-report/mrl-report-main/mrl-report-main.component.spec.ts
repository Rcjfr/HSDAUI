import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrlReportMainComponent } from './mrl-report-main.component';

describe('MrlReportMainComponent', () => {
  let component: MrlReportMainComponent;
  let fixture: ComponentFixture<MrlReportMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrlReportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrlReportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
