import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteComponentComponent } from './dte-component.component';

describe('DteComponentComponent', () => {
  let component: DteComponentComponent;
  let fixture: ComponentFixture<DteComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
