import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMaintenanceSectionComponent } from './scheduled-maintenance-section.component';

describe('ScheduledMaintenanceSectionComponent', () => {
  let component: ScheduledMaintenanceSectionComponent;
  let fixture: ComponentFixture<ScheduledMaintenanceSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMaintenanceSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMaintenanceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
