import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDetailViewComponent } from '../alert-detail-view/alert-detail-view.component';

describe('AlertDetailViewComponent', () => {
  let component: AlertDetailViewComponent;
  let fixture: ComponentFixture<AlertDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
