
/// <reference path="../../reducers/models/alert.ts" />
import { AppStateService } from '../app-state.service';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '../../models';
import {AircraftInfoRecord, aircraftInfoFactory} from '../../reducers/models/aircraft-info';
import { AlertRecord, alertFactory } from '../../reducers/models/alert';

export class MockAppStateService extends AppStateService {
  constructor() {
    super(null);
  }

  getAlertCodes() {
    return Observable.of(<List<models.IAlertCode>>List.of());
  }

  getATACodes() {
    const mockResponse = [
      {
        'id': 32,
        'primaryCode': 'Landing Gear',
        'primaryCodeDescription': `Includes Basic Structure which provides major support
                                                for the aircraft, while on the ground,
                                                such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
        'secondaryCode': '10',
        'secondaryCodeDescription': 'Main Gear'
      }
    ];
    return Observable.of(<List<models.IATACode>>List.of(...mockResponse));
    }

  getDepartments() {
    return Observable.of(<List<models.IDepartment>>List.of());
  }

  getCheckTypes() {
    return Observable.of(<List<models.ICheckType>>List.of());
  }

  getCorrosionTypes() {
    return Observable.of(<List<models.ICorrosionType>>List.of());
  }

  getCorrosionLevels() {
    return Observable.of(<List<models.ICorrosionLevel>>List.of());
  }

  getDetectionMethods() {
    return Observable.of(<List<models.IDetectionMethod>>List.of());
  }

  getStations(query: string) {
    return Observable.of([]);
  }

  getAircraftInfo() {
    return Observable.of(aircraftInfoFactory());
  }

  getSelectedAlert() {
    return Observable.of(alertFactory());
  }

  getSelectedAlertLoading() {
    return Observable.of(false);
  }
  getFleetCheckTypes() {
    return Observable.of(<List<models.ICheckType>>List.of());
  }
}
