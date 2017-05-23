import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledMaintenanceSectionComponent } from './unscheduled-maintenance-section.component';

describe('UnscheduledMaintenanceSectionComponent', () => {
  let component: UnscheduledMaintenanceSectionComponent;
  let fixture: ComponentFixture<UnscheduledMaintenanceSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledMaintenanceSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledMaintenanceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
