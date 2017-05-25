import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciseLocationGroupComponent } from './precise-location-group.component';

describe('PreciseLocationGroupComponent', () => {
  let component: PreciseLocationGroupComponent;
  let fixture: ComponentFixture<PreciseLocationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciseLocationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciseLocationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
