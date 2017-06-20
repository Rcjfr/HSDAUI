﻿import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from "@angular/core";
import { FormControlsModule } from '../../common/directives/form/form-controls.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PreciseLocationGroupComponent } from './precise-location-group.component';

describe('PreciseLocationGroupComponent', () => {
  let component: PreciseLocationGroupComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, PreciseLocationGroupComponent],
      imports: [FormsModule, FormControlsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <PreciseLocationGroupComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: `
<app-precise-location-group [parent]="form" [errorMessages]="displayMessage">
</app-precise-location-group>
`
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}