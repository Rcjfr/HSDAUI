import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { DefectLocationSectionFormComponent } from './defect-location-section-form.component';
import { AppStateService } from '@app/common/services';
import { TextMaskModule } from 'angular2-text-mask';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { PreciseLocationGroupComponent } from '@app/components/sda/defect-location-section/precise-location-group/precise-location-group.component';
describe('DefectLocationSectionFormComponent', () => {
  let component: DefectLocationSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, DefectLocationSectionFormComponent, PreciseLocationGroupComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, TextMaskModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <DefectLocationSectionFormComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<aa-defect-location-section-form [parent]="form" [errorMessages]="displayMessage"></aa-defect-location-section-form>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
