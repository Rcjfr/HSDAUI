import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectLocationSectionFormComponent } from './defect-location-section-form.component';

describe('DefectLocationSectionFormComponent', () => {
  let component: DefectLocationSectionFormComponent;
  let fixture: ComponentFixture<DefectLocationSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectLocationSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectLocationSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
