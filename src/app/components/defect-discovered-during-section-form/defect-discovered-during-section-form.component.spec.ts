import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectDiscoveredDuringSectionFormComponent } from './defect-discovered-during-section-form.component';

describe('DefectDiscoveredDuringSectionFormComponent', () => {
  let component: DefectDiscoveredDuringSectionFormComponent;
  let fixture: ComponentFixture<DefectDiscoveredDuringSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectDiscoveredDuringSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectDiscoveredDuringSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
