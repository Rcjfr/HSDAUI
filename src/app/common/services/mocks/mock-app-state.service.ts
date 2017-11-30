import { AppStateService } from '@app/common/services/app-state.service';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { IAircraftInfoRecord, AircraftInfoFactory } from '@app/common/reducers/models/aircraft-info';
import { ISdaRecord, SdaFactory } from '@app/common/reducers/models/sda';
import { UserRecordFactory, IUserRecord } from '@app/common/reducers/models/user';
import { ISearchCriteriaRecord, SearchCriteriaRecordFactory } from '@app/common/reducers/models/search-criteria';


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
    return Observable.of(AircraftInfoFactory());
  }

  getSelectedAlert() {
    return Observable.of(SdaFactory());
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
    const mockResponse: models.IBaseLookUp[] = [
          { 'id': 1, 'description': 'Open' },
          { 'id': 2, 'description': 'Closed' },
          { 'id': 3, 'description': 'TBD' }
      ];

      return Observable.of(mockResponse);


  }
  getRepairInspectionStatus() {
    return Observable.of([]);
  }
  getSearchCriteria() {
    return Observable.of(SearchCriteriaRecordFactory());
  }
}
