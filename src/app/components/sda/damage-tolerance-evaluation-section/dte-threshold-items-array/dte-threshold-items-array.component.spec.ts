import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteThresholdItemsArrayComponent } from './dte-threshold-items-array.component';

describe('DteThresholdItemArrayComponent', () => {
  let component: DteThresholdItemsArrayComponent;
  let fixture: ComponentFixture<DteThresholdItemsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteThresholdItemsArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteThresholdItemsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
