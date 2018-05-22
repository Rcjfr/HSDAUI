import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteEngineComponent } from './dte-engine.component';

describe('DteEngineComponent', () => {
  let component: DteEngineComponent;
  let fixture: ComponentFixture<DteEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
