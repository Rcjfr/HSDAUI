import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteFieldContainerComponent } from './dte-field-container.component';

describe('DteFieldContainerComponent', () => {
  let component: DteFieldContainerComponent;
  let fixture: ComponentFixture<DteFieldContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteFieldContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
