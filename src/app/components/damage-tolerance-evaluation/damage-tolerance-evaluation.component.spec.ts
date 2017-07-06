import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageToleranceEvaluationComponent } from './damage-tolerance-evaluation.component';

describe('DamageToleranceEvaluationComponent', () => {
  let component: DamageToleranceEvaluationComponent;
  let fixture: ComponentFixture<DamageToleranceEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageToleranceEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageToleranceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
