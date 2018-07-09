import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwdReportGridComponent } from './twd-report-grid.component';

describe('TwdReportGridComponent', () => {
  let component: TwdReportGridComponent;
  let fixture: ComponentFixture<TwdReportGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwdReportGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwdReportGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
