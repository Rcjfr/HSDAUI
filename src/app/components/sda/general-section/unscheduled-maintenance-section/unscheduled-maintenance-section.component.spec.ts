import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UnscheduledMaintenanceSectionComponent } from './unscheduled-maintenance-section.component';
import { FormControlsModule } from './../../common/components/form-controls.module';
import { Component } from '@angular/core';

describe('UnscheduledMaintenanceSectionComponent', () => {
  let component: UnscheduledMaintenanceSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, UnscheduledMaintenanceSectionComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <UnscheduledMaintenanceSectionComponent>fixture.debugElement.children[0].componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<aa-unscheduled-maintenance-section [parent]="form" [errorMessages]="displayMessage"></aa-unscheduled-maintenance-section>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
