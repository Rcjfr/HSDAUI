import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
import { ISda, ILazyLoadEvent, ISdaListResult } from '@app/common/models';
describe('Alerts Effect', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      RouterTestingModule,
      ToastrModule.forRoot(),
    ],
    providers: [
      AlertEffects, services.AircraftService, services.SdaService, services.AuthService, services.ChangeLog, services.SdaExportService,
      { 'provide': HttpClient, 'useValue': null },
      { 'provide': Http, 'useValue': null },
      { provide: services.AppStateService, useClass: MockAppStateService },
      { 'provide': Store, 'useValue': null }]
  }));

  it('Call QueryNoseNumber Success action after Query Nose Numbers',
    inject([
      EffectsRunner, AlertEffects, services.AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        spyOn(_aircraftService, 'queryNoseNumbers')
          .and.returnValue(Observable.of([{
            'noseNumber': 'A330',
            'cycles': 912,
            'fleet': '912',
            'manufacturer': 'Airbus',
            'model': 'A-330-200',
            'serialNo': '1441',
            'totalShipTime': 5771
          }]));
        _runner.queue(new selectedAlert.LoadNoseNumbersAction('A'));
        _alertEffects.loadNoseNumbers$.subscribe(result => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE);
          expect(result.payload.length).toEqual(1);
          expect(result.payload[0].noseNumber).toEqual('A330');
        });
      })
  );

  it('Call QueryNoseNumber Failure action after Query Nose Numbers',
    inject([
      EffectsRunner, AlertEffects, services.AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        spyOn(_aircraftService, 'queryNoseNumbers')
          .and.returnValue(Observable.throw('ERROR'));
        _runner.queue(new selectedAlert.LoadNoseNumbersAction('A'));
        _alertEffects.loadNoseNumbers$.subscribe(result => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL);
          expect(result.payload).toEqual('Failed to load Nose Numbers');
        }
        );
      })
  );

  it('Call get Aircraft Info Success action after get Aircraft Info',
    inject([
      EffectsRunner, AlertEffects, services.AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        const mockResponse = {
          'noseNumber': 'A330',
          'cycles': 912,
          'fleet': '912',
          'manufacturer': 'Airbus',
          'model': 'A-330-200',
          'serialNo': '1441',
          'totalShipTime': 5771
        };
        spyOn(_aircraftService, 'getAircraftInfo')
          .and.returnValue(Observable.of(mockResponse));
        _runner.queue(new selectedAlert.LoadAircraftInfoAction('A330'));
        _alertEffects.loadAircraftInfo$.subscribe((result: selectedAlert.LoadAircraftInfoCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.noseNumber).toEqual('A330');
          expect(result.payload.manufacturer).toEqual('Airbus');
        });
      })
  );

  it('Call get Aircraft Info Failure action after get Aircraft Info',
    inject([
      EffectsRunner, AlertEffects, services.AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        const mockResponse = {
          'noseNumber': 'A330',
          'cycles': 912,
          'fleet': '912',
          'manufacturer': 'Airbus',
          'model': 'A-330-200',
          'serialNo': '1441',
          'totalShipTime': 5771
        };
        spyOn(_aircraftService, 'getAircraftInfo')
          .and.returnValue(Observable.throw('ERROR'));
        _runner.queue(new selectedAlert.LoadAircraftInfoAction('A330'));
        _alertEffects.loadAircraftInfo$.take(1).subscribe((result: selectedAlert.LoadAircraftInfoFailAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL);
          expect(result.payload).toEqual('Failed to load aircraft information. Please check the aircraft # or try again by clicking refresh button.');
        });
        _alertEffects.loadAircraftInfo$.takeLast(1).subscribe((result: selectedAlert.LoadAircraftInfoCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE);
          expect(result.payload.manufacturer).toEqual('');
        });
      })
  );

  it('Call saveSDA Success action after saveSDA',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {
        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'saveSda')
          .and.returnValue(Observable.of(mockResponse));
        spyOn(_appStateService, 'notifySavedSda');
        _runner.queue(new selectedAlert.SaveSdaAction(mockResponse));
        _alertEffects.saveSda$.subscribe((result: selectedAlert.SaveSdaCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.sdaId).toEqual(1);
        });
      })
  );

  it('Call saveSDA Failure action after saveSDA',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {
        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'saveSda')
          .and.returnValue(Observable.throw('ERROR'));
        _runner.queue(new selectedAlert.SaveSdaAction(mockResponse));
        _alertEffects.saveSda$.subscribe((result: selectedAlert.SaveSdaFailAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.SAVE_SDA_FAIL);
          expect(result.payload).toEqual('Failed to save SDA.');
        });
      })
  );

  it('Call Show Toastr error after any fail actions',
    inject([EffectsRunner, AlertEffects, services.AircraftService, ToastrService],
      (_runner, _alertEffects, _aircraftService, _toaster) => {
        spyOn(_toaster, 'error').and.returnValue(null);
        _runner.queue(new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft Info.'));
        _alertEffects.showToastrError$.subscribe(result => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.OPERATION_FAILED);
          expect(_toaster.error).toHaveBeenCalledWith('Failed to load aircraft Info.', 'ERROR');
        });
      })
  );

  it('Call loadSDAS Success action after loadSDAs',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {
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

        _runner.queue(new selectedAlert.LoadSdasAction(mockData));
        _alertEffects.loadSdas$.subscribe((result: selectedAlert.LoadSdasCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDAS_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.totalRecords).toEqual(20);
        });
      })
  );

  it('Call loadSDAS Failure action after loadSDAS',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {
        const mockData: ILazyLoadEvent = {
          first: 0,
          rows: 20,
          sortField: '',
          sortOrder: 0
        };
        spyOn(_sdaService, 'searchSda')
          .and.returnValue(Observable.throw('ERROR'));
        _runner.queue(new selectedAlert.LoadSdasAction(mockData));
        _alertEffects.loadSdas$.subscribe((result: selectedAlert.LoadSdasFailAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDAS_FAIL);
          expect(result.payload).toEqual('Failed to load SDAs.');
        });
      })
  );


  it('Call loadSDA Success action after loadSDA',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {

        const mockResponse: ISda = {
          id: 1
        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(mockResponse));

        _runner.queue(new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: false }));
        _alertEffects.loadSda$.subscribe((result: selectedAlert.LoadSdaCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDA_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.id).toEqual(1);
        });
      })
  );

  it('Call loadSDA Success action after loadSDA(new)',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {

        const mockResponse: ISda = {

        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(mockResponse));

        _runner.queue(new selectedAlert.LoadSdaAction({ sdaId: 0, version: 0, original: false }));
        _alertEffects.loadSda$.subscribe((result: selectedAlert.LoadSdaCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDA_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.id).toBeUndefined();
        });
      })
  );
  it('Call loadSDA Success action after loadSDA(without original version)',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {

        const mockResponse: ISda = {

        };
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.of(null));
        const router = TestBed.get(Router);
        const navigateSpy = spyOn(router, 'navigate');

        _runner.queue(new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: true }));
        _alertEffects.loadSda$.subscribe((result: selectedAlert.LoadSdaCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDA_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.id).toBeUndefined();
          expect(navigateSpy).toHaveBeenCalledWith(['/alerts', 1]);
        });
      })
  );

  it('Call loadSDA Failure action after loadSDA',
    inject([
      EffectsRunner, AlertEffects, services.SdaService, services.AppStateService
    ],
      (_runner, _alertEffects: AlertEffects, _sdaService, _appStateService) => {
        spyOn(_sdaService, 'getSda')
          .and.returnValue(Observable.throw('ERROR'));
        _runner.queue(new selectedAlert.LoadSdaAction({ sdaId: 1, version: 0, original: false }));
        _alertEffects.loadSda$.subscribe((result: selectedAlert.LoadSdaFailAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_SDA_FAIL);
          expect(result.payload).toEqual('Failed to load SDA.');
        });
      })
  );

  it('Call Show Load SDA Fail error',
    inject([EffectsRunner, AlertEffects, services.AircraftService, ToastrService],
      (_runner, _alertEffects, _aircraftService, _toaster) => {
        const router = TestBed.get(Router);
        spyOn(_toaster, 'error').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');
        _runner.queue(new selectedAlert.LoadSdaFailAction('Failed to load sda Info.'));
        _alertEffects.showLoadSdaFailError$.subscribe(result => {
          expect(_toaster.error).toHaveBeenCalledWith('Failed to load sda Info.', 'ERROR');
          expect(navigateSpy).toHaveBeenCalledWith(['/alerts']);
        });
      })
  );

});
