import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcpTaskDescriptionComponent } from './cpcp-task-description.component';

describe('CpcpTaskDescriptionComponent', () => {
  let component: CpcpTaskDescriptionComponent;
  let fixture: ComponentFixture<CpcpTaskDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcpTaskDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcpTaskDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
