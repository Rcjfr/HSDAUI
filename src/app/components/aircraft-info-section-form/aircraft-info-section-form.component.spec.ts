import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftInfoSectionFormComponent } from './aircraft-info-section-form.component';

describe('AircraftInfoSectionFormComponent', () => {
  let component: AircraftInfoSectionFormComponent;
  let fixture: ComponentFixture<AircraftInfoSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftInfoSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftInfoSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
