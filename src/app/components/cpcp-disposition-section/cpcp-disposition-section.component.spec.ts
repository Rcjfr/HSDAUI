import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcpDispositionSectionComponent } from './cpcp-disposition-section.component';

describe('CpcpDispositionSectionComponent', () => {
  let component: CpcpDispositionSectionComponent;
  let fixture: ComponentFixture<CpcpDispositionSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcpDispositionSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcpDispositionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
