import { SdaSearchModule } from '@app/components/search/sda-search.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AlertsSearchComponent } from './alerts-search.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';
import { AppStateService } from '@app/common/services';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Rx';

describe('AlertsSearchComponent', () => {
  const component: AlertsSearchComponent = new AlertsSearchComponent(null, null, null, null, null);
   //const fixture: ComponentFixture<AlertsSearchComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AlertsSearchComponent],
  //     imports: [FormControlsModule, FormsModule, ReactiveFormsModule, AccordionModule.forRoot(),
  //           NKDatetimeModule, TypeaheadModule.forRoot(), NgPipesModule, TextMaskModule, SdaSearchModule],
  //     schemas: [],
  //     providers: [AppStateService, DialogService]
  //   })
  //     .compileComponents();
  // }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run saved search when criteria are not changed', () => {
    const alertSearch = new AlertsSearchComponent(null, null, null, null, null);
    alertSearch.criteria = {
      'searchByDateRange' : {
        'dateFrom': new Date('2017-10-31T00:00:00'),
       'dateThrough': new Date('2017-12-01T00:00:00')}
      }
      const savedCriteria = {
       'searchByDateRange' : {
         'dateFrom':  '2017-10-31T00:00:00',
        'dateThrough': '2017-12-01T00:00:00'}
      }
      spyOn(alertSearch, 'searchAlerts');
      alertSearch.runSavedSearch(savedCriteria);
      expect(alertSearch.searchAlerts).toHaveBeenCalledTimes(1);
 })

 it('should Call dialogurbox when saved criteria are changed', () => {

  const dialogueService = new DialogService(null, null, null, null);

  const alertSearch = new AlertsSearchComponent(null, null, null, dialogueService, null);
  alertSearch.criteria = {
    'searchByDateRange' : {
      'dateFrom': new Date('2017-10-31T00:00:00'),
     'dateThrough': new Date('2017-12-01T00:00:00')}
    }
    const savedCriteria = {
     'searchByDateRange' : {
       'dateFrom':  '2017-10-31T00:00:00',
       //Date Changed
      'dateThrough': '2017-12-02T00:00:00'}
    }
    spyOn(dialogueService, 'addDialog').and.returnValue(Observable.of(false));
    alertSearch.runSavedSearch(savedCriteria);
    expect(dialogueService.addDialog).toHaveBeenCalledTimes(1);
});

it('should Call searchAlerts when user decide to search changed criteria', () => {

    const dialogueService = new DialogService(null, null, null, null);
    const alertSearch = new AlertsSearchComponent(null, null, null, dialogueService, null);
    alertSearch.criteria = {
      'searchByDateRange' : {
        'dateFrom': new Date('2017-10-31T00:00:00'),
       'dateThrough': new Date('2017-12-01T00:00:00')}
      }
      const savedCriteria = {
       'searchByDateRange' : {
         'dateFrom':  '2017-10-31T00:00:00',
         //Date Changed
        'dateThrough': '2017-12-02T00:00:00'}
      }
      spyOn(dialogueService, 'addDialog').and.returnValue(Observable.of(true));
      spyOn(alertSearch, 'searchAlerts');
      alertSearch.runSavedSearch(savedCriteria);
      expect(alertSearch.searchAlerts).toHaveBeenCalledTimes(1);
  });
});
