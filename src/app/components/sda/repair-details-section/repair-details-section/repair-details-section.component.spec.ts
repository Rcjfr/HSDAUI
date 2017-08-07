import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDetailsSectionComponent } from './repair-details-section.component';

describe('RepairDetailsSectionComponent', () => {
  let component: RepairDetailsSectionComponent;
  let fixture: ComponentFixture<RepairDetailsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairDetailsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
