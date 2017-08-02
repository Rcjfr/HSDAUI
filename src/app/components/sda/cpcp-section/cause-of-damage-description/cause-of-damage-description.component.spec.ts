import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { Component } from '@angular/core';
import { CauseOfDamageDescriptionComponent } from './cause-of-damage-description.component';

describe('CauseOfDamageDescriptionComponent', () => {
  let component: CauseOfDamageDescriptionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, CauseOfDamageDescriptionComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <CauseOfDamageDescriptionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<aa-cause-of-damage-description [parent]="form" [errorMessages]="displayMessage"></aa-cause-of-damage-description>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
