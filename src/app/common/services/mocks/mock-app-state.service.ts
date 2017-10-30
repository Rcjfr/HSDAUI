import { AppStateService } from '../app-state.service';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '../../models';
import { AircraftInfoRecord, aircraftInfoFactory } from '../../reducers/models/aircraft-info';
import { SdaRecord, sdaFactory } from '../../reducers/models/sda';
import { UserRecordFactory, IUserRecord } from '../../reducers/models/user';

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
        'primaryId': 32,
        'primaryCode': 'Landing Gear',
        'primaryCodeDescription': `Includes Basic Structure which provides major support
                                                for the aircraft, while on the ground,
                                                such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
        'secondaryId': 3210,
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
    return Observable.of(sdaFactory());
  }

  getSelectedAlertLoading() {
    return Observable.of(false);
  }

  getFleetCheckTypes() {
    return Observable.of(<List<models.ICheckType>>List.of());
  }

  getRepairDescriptions() {
    return Observable.of(<List<models.IRepairDescription>>List.of());
  }

  getRepairDocuments() {
    return Observable.of(<List<models.IRepairDocument>>List.of());
  }

  getCauseOfDamages() {
    return Observable.of(<List<models.ICauseOfDamage>>List.of());
  }

  getReasonsForChange() {
    return Observable.of(<List<models.IReasonForChange>>List.of());
  }

  getDamageTypes() {
    return Observable.of(<List<models.IDamageType>>List.of());
  }
  getUser() {
    return Observable.of(UserRecordFactory({
      access_token: 'access_token',
      roles: [],
      sm_user: '00123456',
      sm_user_email: 'testuser@aa.com',
      sm_user_firstname: 'FirstName',
      sm_user_lastname: 'LastName'
    }))
  }
  getDTEStatus() {
    return Observable.of(<List<models.IBaseLookUp>>List.of());
  }
  getRepairInspectionStatus() {
    return Observable.of(<List<models.IBaseLookUp>>List.of());
  }
}
