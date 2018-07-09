import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsMrrGridComponent } from './alerts-mrr-grid.component';

describe('AlertsMrrGridComponent', () => {
  let component: AlertsMrrGridComponent;
  let fixture: ComponentFixture<AlertsMrrGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsMrrGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsMrrGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
