import { SdaSearchModule } from '../search/sda-search.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { AlertsSaveSearchesComponent } from './alerts-save-searches.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';
import { AppStateService } from '../../common/services';
import { DialogService } from 'ng2-bootstrap-modal';

describe('AlertsSaveSearchesComponent', () => {
  let component: AlertsSaveSearchesComponent;
  let fixture: ComponentFixture<AlertsSaveSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsSaveSearchesComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, AccordionModule.forRoot(),
            NKDatetimeModule, TypeaheadModule.forRoot(), NgPipesModule, TextMaskModule, SdaSearchModule],
      schemas: [],
      providers: [AppStateService, DialogService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSaveSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
