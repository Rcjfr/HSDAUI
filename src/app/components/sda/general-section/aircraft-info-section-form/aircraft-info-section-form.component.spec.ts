import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { HttpModule } from '@angular/http';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AircraftInfoSectionFormComponent } from './aircraft-info-section-form.component';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
describe('AircraftInfoSectionFormComponent', () => {
  let component: AircraftInfoSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, AircraftInfoSectionFormComponent],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule, FormsModule,
        HttpModule, FormControlsModule
        //TypeaheadModule.forRoot(),
        //ToastModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <AircraftInfoSectionFormComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<aa-aircraft-info-section-form [parent]="form" [errorMessages]="displayMessage"></aa-aircraft-info-section-form>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
