import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { AlertEffects } from '@app/common/effects/alerts.effects';
import * as selectedAlert from '@app/common/actions/selected-alert';
import * as services from '@app/common/services';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ISda, ILazyLoadEvent, ISdaListResult, IAircraftInfo } from '@app/common/models';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'ng2-bootstrap-modal';

describe('Alerts Effect', () => {
  let effects: AlertEffects;
  let actions: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        NgIdleKeepaliveModule.forRoot()
      ],
      providers: [
        AlertEffects, ConfirmationService, DialogService,
        provideMockActions(() => actions),
        services.AircraftService, services.SdaService, services.AuthService, services.ChangeLog,
        services.MrlExportService, services.SdaExportService, services.TwdExportService, services.MrrExportService,
        { 'provide': HttpClient, 'useValue': null },
        { 'provide': Http, 'useValue': null },
        { provide: services.AppStateService, useClass: MockAppStateService },
        { 'provide': Store, 'useValue': null }]
    });
    effects = TestBed.get(AlertEffects);
  });

  it('Call QueryNoseNumber Success action after Query Nose Numbers',
    inject([services.AircraftService
    ],
      (_aircraftService) => {
        const mockData: IAircraftInfo[] = [{
          'noseNumber': 'A330',
          'registrationNumber': 'TEST',
          'cycles': '912',
          'fleet': '912',
          'manufacturer': 'Airbus',
          'model': 'A-330-200',
          'serialNo': '1441',
          'totalShipTime': '5771'
        }];
        spyOn(_aircraftService, 'queryNoseNumbers').and.returnValue(Observable.of(mockData));
        actions = hot('--a-', { a: new selectedAlert.LoadNoseNumbersAction('A') });
        const expected = cold('--b', { b: new selectedAlert.LoadNoseNumbersCompleteAction(mockData) });
        expect(effects.loadNoseNumbers$).toBeObservable(expected);
      })
  );

  it('Call QueryNoseNumber Failure action after Query Nose Numbers',
    inject([
      services.AircraftService
    ],
      (_aircraftService) => {
        spyOn(_aircraftService, 'queryNoseNumbers')
          .and.returnValue(Observable.throw('ERROR'));
        actions = hot('--a-', { a: new selectedAlert.LoadNoseNumbersAction('A') });
        const expected = cold('--b', { b: new selectedAlert.LoadNoseNumbersFailAction('Failed to load Nose Numbers') });
        expect(effects.loadNoseNumbers$).toBeObservable(expected);
      })
  );

  it('Call get Aircraft Info Success action after get Aircraft Info',
    inject([
      services.AircraftService
    ],
      (_aircraftService) => {
        const mockResponse = {
          'noseNumber': 'A330',
          'registrationNumber': 'TEST',
          'cycles': '912',
          'fleet': '912',
          'manufacturer': 'Airbus',
          'model': 'A-330-200',
          'serialNo': '1441',
          'totalShipTime': '5771'
        };
        spyOn(_aircraftService, 'getAircraftInfo')
          .and.returnValue(Observable.of(mockResponse));
        actions = hot('--a-', { a: new selectedAlert.LoadAircraftInfoAction({ noseNumber: 'A330', flightDate: new Date() }) });
        const expected = cold('--b', { b: new selectedAlert.LoadAircraftInfoCompleteAction(mockResponse) });
        expect(effects.loadAircraftInfo$).toBeObservable(expected);
      })
  );

  it('Call get Aircraft Info Failure action after get Aircraft Info',
    inject([
      services.AircraftService
    ],
      (_aircraftService) => {
        const mockResponse = {
          'noseNumber': 'A330',
          'registrationNumber': '',
          'cycles': '',
          'fleet': '',
          'manufacturer': '',
          'model': '',
          'serialNo': '',
          'totalShipTime': ''
        };
        const err = 'Failed to load aircraft information. Please check the aircraft # or try again by clicking refresh button.';
        spyOn(_aircraftService, 'getAircraftInfo')
          .and.returnValue(Observable.throw('ERROR'));
        actions = hot('--a-', { a: new selectedAlert.LoadAircraftInfoAction({ noseNumber: 'A330', flightDate: new Date() }) });
        const expected = cold('--(bc)', {
          b: new selectedAlert.LoadAircraftInfoFailAction(err),
          c: new selectedAlert.LoadAircraftInfoCompleteAction(mockResponse)
        });
        expect(effects.loadAircraftInfo$).toBeObservable(expected);
      })
  );

  it('Call saveSDA Success action after saveSDA',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {
        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'saveSda')
          .and.returnValue(Observable.of(mockResponse));
        spyOn(_appStateService, 'notifySavedSda');

        //actions = hot('--a-', { a: new selectedAlert.SaveSdaAction(mockResponse) });
        //const expected = cold('--b', { b: new selectedAlert.SaveSdaCompleteAction({ sdaId: 1, newSda: false, Timestamp: new Date() }) });
        //expect(effects.saveSda$).toBeObservable(expected);

        actions = new ReplaySubject(1);
        (<ReplaySubject<any>>actions).next(new selectedAlert.SaveSdaAction(mockResponse));
        effects.saveSda$.subscribe((result: selectedAlert.SaveSdaCompleteAction) => {
          expect(result.type).toBe(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE);
        });
      })
  );

  it('Call saveSDA Failure action after saveSDA',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {
        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'saveSda')
          .and.returnValue(Observable.throw('ERROR'));
        actions = new ReplaySubject(1);
        (<ReplaySubject<any>>actions).next(new selectedAlert.SaveSdaAction(mockResponse));
        effects.saveSda$.subscribe((result: selectedAlert.SaveSdaFailAction) => {
          expect(result.type).toBe(selectedAlert.ActionTypes.SAVE_SDA_FAIL);
        });
      })
  );

  it('Call Show Toastr error after any fail actions',
    inject([services.AircraftService, ToastrService],
      (_aircraftService, _toaster) => {
        spyOn(_toaster, 'error').and.returnValue(null);

        actions = new ReplaySubject(1);
        (<ReplaySubject<any>>actions).next(new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft Info.'));
        effects.saveSda$.subscribe((result: selectedAlert.OperationFailedAction) => {
          expect(result.type).toBe(selectedAlert.ActionTypes.OPERATION_FAILED);
          expect(_toaster.error).toHaveBeenCalledWith('Failed to load aircraft Info.', 'ERROR');
        });
      })
  );

  it('Call loadSDAS Success action after loadSDAs',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {
        const mockData: ILazyLoadEvent = {
          first: 0,
          rows: 20,
          sortField: '',
          sortOrder: 0
        };
        const mockResponse: ISdaListResult = {
          totalRecords: 20,
          records: []
        };
        spyOn(_sdaService, 'searchSda')
          .and.returnValue(Observable.of(mockResponse));

        actions = hot('--a-', { a: new selectedAlert.LoadSdasAction(mockData) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdasCompleteAction(mockResponse) });
        expect(effects.loadSdas$).toBeObservable(expected);
      })
  );

  it('Call loadSDAS Failure action after loadSDAS',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {
        const mockData: ILazyLoadEvent = {
          first: 0,
          rows: 20,
          sortField: '',
          sortOrder: 0
        };
        spyOn(_sdaService, 'searchSda')
          .and.returnValue(Observable.throw('ERROR'));
        actions = hot('--a-', { a: new selectedAlert.LoadSdasAction(mockData) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdasFailAction('Failed to load SDAs.') });
        expect(effects.loadSdas$).toBeObservable(expected);
      })
  );


  it('Call loadSDA Success action after loadSDA',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {

        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(mockResponse));

        actions = hot('--a-', { a: new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: false }) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdaCompleteAction(mockResponse) });
        expect(effects.loadSda$).toBeObservable(expected);
      })
  );

  it('Call loadSDA Success action after loadSDA(new)',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {

        const mockResponse: ISda = {

        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(mockResponse));

        actions = hot('--a-', { a: new selectedAlert.LoadSdaAction({ sdaId: 0, version: 0, original: false }) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdaCompleteAction(mockResponse) });
        expect(effects.loadSda$).toBeObservable(expected);
      })
  );
  it('Call loadSDA Success action after loadSDA(without original version)',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {

        const mockResponse: ISda = {

        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(null));
        const router = TestBed.get(Router);
        const navigateSpy = spyOn(router, 'navigate');

        actions = hot('--a-', { a: new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: true }) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdaCompleteAction(mockResponse) });
        expect(effects.loadSda$).toBeObservable(expected);
        expect(navigateSpy).toHaveBeenCalledWith(['/alerts', 1]);
      })
  );

  it('Call loadSDA Failure action after loadSDA',
    inject([
      services.SdaService, services.AppStateService
    ],
      (_sdaService, _appStateService) => {
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.throw('ERROR'));
        actions = hot('--a-', { a: new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: false }) });
        const expected = cold('--b', { b: new selectedAlert.LoadSdaFailAction('Failed to load SDA.') });
        expect(effects.loadSda$).toBeObservable(expected);
      })
  );

  it('Call Show Load SDA Fail error',
    inject([services.AircraftService, ToastrService],
      (_aircraftService, _toaster) => {
        const router = TestBed.get(Router);
        spyOn(_toaster, 'error').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');
        actions = new ReplaySubject(1);
        (<ReplaySubject<any>>actions).next(new selectedAlert.LoadSdaFailAction('Failed to load sda Info.'));
        effects.showLoadSdaFailError$.subscribe(result => {
          expect(_toaster.error).toHaveBeenCalledWith('Failed to load sda Info.', 'ERROR');
          expect(navigateSpy).toHaveBeenCalledWith(['/alerts']);
        });
      })
  );

});
