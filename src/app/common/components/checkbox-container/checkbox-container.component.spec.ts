import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CheckboxContainerComponent } from './checkbox-container.component';
import { Component } from '@angular/core';

describe('CheckboxContainerComponent initialization success', () => {
  let component: CheckboxContainerComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxContainerComponent, TestComponentWrapperComponent],
      imports: [
        ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    //component = fixture.componentInstance;
    component = <CheckboxContainerComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('CheckboxContainerComponent Initialization failure', () => {
  let component: CheckboxContainerComponent;
  let fixture: ComponentFixture<CheckboxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxContainerComponent],
      imports: [
        ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxContainerComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); //do not detect changes here when testing Lifecycle hooks
  });

  it('should throw error if no checkbox control is specified as child control', () => {
    expect(component).toBeTruthy();
    //expect(component.ngAfterContentInit).toThrowError('Invalid child control');
    expect(function () { component.ngAfterContentInit(); }).toThrowError('Invalid child control');

  });
});

@Component({
  selector: 'test-component-wrapper',
  template: `<aac-checkbox-container label="Line Maintenance">
  <input type="checkbox" tabindex="2" />
  </aac-checkbox-container>`
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
