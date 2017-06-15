import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UnscheduledMaintenanceSectionComponent } from './unscheduled-maintenance-section.component';
import { FieldContainer } from '../../common/directives/form/field-container'
import { Component } from "@angular/core";

describe('UnscheduledMaintenanceSectionComponent', () => {
  let component: UnscheduledMaintenanceSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, UnscheduledMaintenanceSectionComponent, FieldContainer],
      imports: [
        FormsModule,
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <UnscheduledMaintenanceSectionComponent>fixture.debugElement.children[0].componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-unscheduled-maintenance-section [parent]="form" [errorMessages]="displayMessage"></app-unscheduled-maintenance-section>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
