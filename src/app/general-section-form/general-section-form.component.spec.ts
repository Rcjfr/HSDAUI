import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSectionFormComponent } from './general-section-form.component';

describe('GeneralSectionFormComponent', () => {
  let component: GeneralSectionFormComponent;
  let fixture: ComponentFixture<GeneralSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
