import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseOfDamageDescriptionComponent } from './cause-of-damage-description.component';

describe('CauseOfDamageDescriptionComponent', () => {
  let component: CauseOfDamageDescriptionComponent;
  let fixture: ComponentFixture<CauseOfDamageDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauseOfDamageDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseOfDamageDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
