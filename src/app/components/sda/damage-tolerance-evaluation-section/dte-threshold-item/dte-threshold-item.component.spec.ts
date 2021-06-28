import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteThresholdItemComponent } from './dte-threshold-item.component';

describe('DteThresholdComponent', () => {
  let component: DteThresholdItemComponent;
  let fixture: ComponentFixture<DteThresholdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteThresholdItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteThresholdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
