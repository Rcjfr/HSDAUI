import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsSearchComponent } from './alerts-search.component';

describe('AlertsSearchComponent', () => {
  let component: AlertsSearchComponent;
  let fixture: ComponentFixture<AlertsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
