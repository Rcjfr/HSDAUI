import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { AlertEffects } from './alerts.effects';
import * as selectedAlert from '../actions/selected-alert';
import { AircraftService } from '../services/aircraft.service';
import { Http } from '@angular/http';

describe('Alerts Effect', () => {
  let runner: EffectsRunner;
  let alertEffects: AlertEffects;
  let aircraftService: AircraftService;
  let toaster: ToastrService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      ToastrModule.forRoot(),
    ],
    providers: [
      AlertEffects, AircraftService,
      { 'provide': Http, 'useValue': null }
    ]
  }));

  xit('Call QueryNoseNumber Success action after Query Nose Numbers',
    inject([
      EffectsRunner, AlertEffects, AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        runner = _runner;
        alertEffects = _alertEffects;
        aircraftService = _aircraftService;
        spyOn(aircraftService, 'queryNoseNumbers')
          .and.returnValue(Observable.of(['A330']));
        runner.queue(new selectedAlert.LoadNoseNumbersAction('A'));
        alertEffects.loadNoseNumbers$.subscribe(result => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE);
          expect(result.payload.length).toEqual(1);
          expect(result.payload[0]).toEqual('A330');
        });
      })
  );

  xit('Call get Aircraft Info Success action after get Aircraft Info',
    inject([
      EffectsRunner, AlertEffects, AircraftService
    ],
      (_runner, _alertEffects, _aircraftService) => {
        runner = _runner;
        alertEffects = _alertEffects;
        aircraftService = _aircraftService;
        const mockResponse = {
          'aircraftNo': 'A330',
          'cycles': 912,
          'fleet': '912',
          'manufacturer': 'Airbus',
          'model': 'A-330-200',
          'serialNo': '1441',
          'totalShipTime': 5771
        };
        spyOn(aircraftService, 'getAircraftInfo')
          .and.returnValue(Observable.of(mockResponse));
        runner.queue(new selectedAlert.LoadAircraftInfoAction('A330'));
        alertEffects.loadAircraftInfo$.subscribe((result: selectedAlert.LoadAircraftInfoCompleteAction) => {
          expect(result.type).toEqual(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE);
          expect(result.payload).toBeTruthy();
          expect(result.payload.aircraftNo).toEqual('A330');
          expect(result.payload.manufacturer).toEqual('Airbus');
        });
      })
  );

  xit('Call Show Toastr error after any fail actions',
    inject([EffectsRunner, AlertEffects, AircraftService, ToastrService],
      (_runner, _alertEffects, _aircraftService, _toaster) => {
        runner = _runner;
        alertEffects = _alertEffects;
        aircraftService = _aircraftService;
        toaster = _toaster;
        spyOn(_toaster, 'error').and.returnValue(null);
        runner.queue(new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft Info.'));
        alertEffects.showToastrError$.subscribe(result => {
          console.log(result);
          expect(toaster.error).toHaveBeenCalledWith('Failed to load aircraft Info.', 'ERROR');
        });
      })
  );
});
