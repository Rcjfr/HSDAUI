import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { GeneralSectionFormComponent } from './general-section-form.component';
import { Component } from '@angular/core';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, TypeaheadMatch } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { MockStore } from '@app/common/store/mock-store';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { MockComponent } from 'ng2-mock-component';

describe('GeneralSectionFormComponent', () => {
  let component: GeneralSectionFormComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;


  beforeEach(async(() => {
     TestBed.configureTestingModule({
         providers: [{ provide: AppStateService, useClass: MockAppStateService }],
       declarations: [GeneralSectionFormComponent, TestComponentWrapperComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule,
        HttpModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        FormsModule,
        // StoreModule.provideStore(reducer),
        ToastrModule.forRoot()
      ]
    })

    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <GeneralSectionFormComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should get ATA Codes from service', () => {
      //Example to use spyOn
      //const service: AppStateService = TestBed.get(AppStateService);
      //component.ATACodes$
      //spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      //fixture.detectChanges(); // move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
    component.ATACodes$.subscribe(a => {
      console.log(a);
            expect(a.length).toBe(1);
      });

  });

});


@Component({
  selector: 'test-component-wrapper',
  template: '<aa-general-section-form [parent]="form" [errorMessages]="displayMessage"></aa-general-section-form>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
