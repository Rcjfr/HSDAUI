import { AppStateService } from '@app/common/services/app-state.service';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AircraftInfoRecord, aircraftInfoFactory } from '@app/common/reducers/models/aircraft-info';
import { SdaRecord, sdaFactory } from '@app/common/reducers/models/sda';
import { UserRecordFactory, IUserRecord } from '@app/common/reducers/models/user';
import { SdaSearchCriteria  } from '@app/common/models/sda-search-criteria.model';

export class MockAppStateService extends AppStateService {
  constructor() {
    super(null);
  }

  getAlertCodes() {
    return Observable.of([]);
  }

  getATACodes() {
    const mockResponse: models.IATACode[] = [
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

    return Observable.of(mockResponse);
  }

  getDepartments() {
    return Observable.of([]);
  }

  getCheckTypes() {
    return Observable.of([]);
  }

  getCorrosionTypes() {
    return Observable.of([]);
  }

  getCorrosionLevels() {
    return Observable.of([]);
  }

  getDetectionMethods() {
    return Observable.of([]);
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
    return Observable.of([]);
  }

  getRepairDocuments() {
    return Observable.of([]);
  }

  getCauseOfDamages() {
    return Observable.of([]);
  }

  getReasonsForChange() {
    return Observable.of([]);
  }

  getDamageTypes() {
    return Observable.of([]);
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
    return Observable.of([]);
  }
  getRepairInspectionStatus() {
    return Observable.of([]);
  }
  getSearchCriteria() {
    return Observable.of(<SdaSearchCriteria>{});
  }
}
