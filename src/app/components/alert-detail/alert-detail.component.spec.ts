import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import * as $ from 'jquery';
import { AlertDetailComponent } from './alert-detail.component';
import { ATACodesService } from '../../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, TypeaheadMatch } from 'ngx-bootstrap';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';

describe('AlertDetailComponent', () => {
  let component: AlertDetailComponent;
  let fixture: ComponentFixture<AlertDetailComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
      declarations: [AlertDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule,
        HttpModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        // StoreModule.provideStore(reducer),
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
    // http://stackoverflow.com/questions/40021366/angular2-mocking-service-in-a-component-mock-ignored
    // TestBed.overrideComponent(AlertDetailComponent, {
    //   set: {
    //     providers: [
    //       { provide: ATACodesService, useClass: MockATACodesService },
    //     ]
    //   }
    // });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDetailComponent);
    component = fixture.componentInstance;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});