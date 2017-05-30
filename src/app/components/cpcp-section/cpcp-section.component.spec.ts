import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcpSectionComponent } from './cpcp-section.component';

describe('CpcpSectionComponent', () => {
  let component: CpcpSectionComponent;
  let fixture: ComponentFixture<CpcpSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcpSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
