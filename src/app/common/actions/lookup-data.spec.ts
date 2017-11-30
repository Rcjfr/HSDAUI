import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';
import * as lookupDataActions from '@app/common/actions/lookup-data';
import { MockStore } from '@app/common/store/mock-store';
describe('LookUpData Actions', () => {
  let mockStore: MockStore<any>;
  beforeEach(() => {
    mockStore = new MockStore({});

  });
  it('LoadFleetCheckTypesAction should handle LOAD_FLEET_CHECK_TYPES action',
    () => {
      const action = new lookupDataActions.LoadFleetCheckTypesAction('B737');

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES);
      expect(action.payload).toBe('B737');
    });

  it('LoadFleetCheckTypesCompleteAction should handle LOAD_FLEET_CHECK_TYPES_COMPLETE action',
    () => {
      const action = new lookupDataActions.LoadFleetCheckTypesCompleteAction([{ id: 1, key: 'A', description: 'A Check' }]);
      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES_COMPLETE);
      expect(action.payload[0].id).toBe(1);
    });

  it('LoadFleetCheckTypesFailAction should handle LOAD_FLEET_CHECK_TYPES_FAIL action',
    () => {
      const action = new lookupDataActions.LoadFleetCheckTypesFailAction('ERROR');

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadStationsAction should handle LOAD_STATIONS action',
    () => {
      const action = new lookupDataActions.LoadStationsAction('D');

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_STATIONS);
      expect(action.payload).toBe('D');
    });

  it('LoadStationsCompleteAction should handle LOAD_STATIONS_COMPLETE action',
    () => {
      const action = new lookupDataActions.LoadStationsCompleteAction([{ stationID: 1, stationIATACode: 'DFW', stationDescription: 'Dallas/Ft Worth Intl, TX' }]);
      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_STATIONS_COMPLETE);
      expect(action.payload[0].stationIATACode).toBe('DFW');
    });

  it('LoadStationsFailAction should handle LOAD_STATIONS_FAIL action',
    () => {
      const action = new lookupDataActions.LoadStationsFailAction('ERROR');

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_STATIONS_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadLookupDataAction should handle LOAD_LOOKUP_DATA action',
    () => {
      const action = new lookupDataActions.LoadLookupDataAction();

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA);
      expect(action.payload).toBeUndefined();
    });

  it('LoadLookupDataCompleteAction should handle LOAD_LOOKUP_DATA_COMPLETE action',
    () => {
      const lookupData = {
        'sdaStatus': [
          {
            'id': 0,
            'key': 'Open',
            'description': 'Open'
          }
        ],
        'alertCodes': [
          {
            'id': 1,
            'key': 'A',
            'description': 'A-Significant Structure Defect'
          }
        ],
        'causeOfDamages': [
          {
            'id': 0,
            'key': 'None',
            'description': 'None'
          }
        ],
        'corrosionLevels': [
          {
            'id': 1,
            'key': 'Level1',
            'description': '1'
          }
        ],
        'corrosionTypes': [
          {
            'id': 1,
            'key': 'Exfoliation',
            'description': 'Exfoliation'
          }
        ],
        'damageTypes': [
          {
            'id': 1,
            'key': 'Accidental',
            'description': 'Accidental (other than impact)'
          }
        ],
        'departments': [
          {
            'id': 1,
            'key': 'Engineering',
            'description': 'Engineering'
          }
        ],
        'detectionMethods': [
          {
            'id': 1,
            'key': 'Unknown',
            'description': 'Unknown'
          }
        ],
        'dteStatus': [
          {
            'id': 1,
            'key': 'Open',
            'description': 'Open'
          }
        ],
        'floorBoardConditions': [
          {
            'id': 1,
            'key': 'Wet',
            'description': 'Wet'
          }
        ],
        'corrosionLevelChangeReasons': [
          {
            'id': 1,
            'key': 'Incorrect',
            'description': 'Incorrect per Corrosion Level Block Diagram'
          }
        ],
        'repairDescriptionTypes': [
          {
            'id': 1,
            'key': 'BondedRepair',
            'description': 'Bonded Repair'
          }
        ],
        'repairDocumentTypes': [
          {
            'id': 1,
            'key': 'AARD',
            'description': 'AARD'
          }
        ],
        'repairInspectionStatus': [
          {
            'id': 1,
            'key': 'PendingDTE',
            'description': 'Pending DTE'
          }
        ],
        'ataCodes': [
          {
            'primaryId': 32,
            'primaryCode': '32',
            'primaryCodeDescription': 'Landing Gear',
            'secondaryId': 3210,
            'secondaryCode': '10',
            'secondaryCodeDescription': 'Main Gear'
          }
        ],
        'checkTypes': [
          {
            'id': 1,
            'description': '2C Interval'
          }
        ]
      };
      const action = new lookupDataActions.LoadLookupDataCompleteAction(lookupData);
      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA_COMPLETE);
      expect(action.payload.alertCodes[0].key).toBe('A');
    });

  it('LoadLookupDataFailedAction should handle LOAD_LOOKUP_DATA_FAILED action',
    () => {
      const action = new lookupDataActions.LoadLookupDataFailedAction('ERROR');

      expect(action.type).toBe(lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA_FAILED);
      expect(action.payload).toBe('ERROR');
    });

});
