import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStatusSectionComponent } from './current-status-section.component';

describe('CurrentStatusSectionComponent', () => {
  let component: CurrentStatusSectionComponent;
  let fixture: ComponentFixture<CurrentStatusSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStatusSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStatusSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
