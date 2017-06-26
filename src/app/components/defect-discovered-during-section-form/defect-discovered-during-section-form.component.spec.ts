import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component } from "@angular/core";
import { FormControlsModule } from '../../common/components/form-controls.module';
import { DefectDiscoveredDuringSectionFormComponent } from './defect-discovered-during-section-form.component';
import { ScheduledMaintenanceSectionComponent } from '../scheduled-maintenance-section/scheduled-maintenance-section.component';
import {
  UnscheduledMaintenanceSectionComponent
  } from '../unscheduled-maintenance-section/unscheduled-maintenance-section.component';
describe('DefectDiscoveredDuringSectionFormComponent', () => {
  let component: DefectDiscoveredDuringSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, DefectDiscoveredDuringSectionFormComponent, ScheduledMaintenanceSectionComponent, UnscheduledMaintenanceSectionComponent]
      , imports: [FormControlsModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <DefectDiscoveredDuringSectionFormComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-defect-discovered-during-section-form [parent]="form" [errorMessages]="displayMessage"></app-defect-discovered-during-section-form>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}