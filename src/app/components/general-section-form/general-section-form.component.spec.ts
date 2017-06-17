import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FormControlsModule } from '../../common/directives/form/form-controls.module';
import { GeneralSectionFormComponent } from './general-section-form.component';
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';

import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../common/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, TypeaheadMatch } from 'ngx-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

describe('GeneralSectionFormComponent', () => {
  let component: GeneralSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
      declarations: [TestComponentWrapper, GeneralSectionFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule
      ]
    })

      .compileComponents();

  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <GeneralSectionFormComponent>fixture.debugElement.children[0].componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-general-section-form [parent]="form" [errorMessages]="displayMessage"></app-general-section-form>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
