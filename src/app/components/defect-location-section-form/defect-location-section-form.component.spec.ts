import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/directives/form/form-controls.module';
import { DefectLocationSectionFormComponent } from './defect-location-section-form.component';
import { AppStateService } from '../../common/services';
import { TextMaskModule } from 'angular2-text-mask';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';
import { PreciseLocationGroupComponent } from '../precise-location-group/precise-location-group.component';
describe('DefectLocationSectionFormComponent', () => {
  let component: DefectLocationSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, DefectLocationSectionFormComponent, PreciseLocationGroupComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, TextMaskModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <DefectLocationSectionFormComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-defect-location-section-form [parent]="form" [errorMessages]="displayMessage"></app-defect-location-section-form>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}