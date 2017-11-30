import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';
import * as selectedAlertActions from '@app/common/actions/selected-alert';
import { MockStore } from '@app/common/store/mock-store';
describe('Saved Searches Actions', () => {
  let mockStore: MockStore<any>;
  beforeEach(() => {
    mockStore = new MockStore({});

  });
  it('OperationFailedAction should handle OPERATION_FAILED action',
    () => {
      const action = new selectedAlertActions.OperationFailedAction();

      expect(action.type).toBe(selectedAlertActions.ActionTypes.OPERATION_FAILED);
      expect(action.payload).toBeUndefined();
    });

  it('LoadNoseNumbersAction should handle LOAD_NOSE_NUMBERS action',
    () => {
      const action = new selectedAlertActions.LoadNoseNumbersAction('3');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS);
      expect(action.payload).toBe('3');
    });

  it('LoadNoseNumbersCompleteAction should handle LOAD_NOSE_NUMBERS_COMPLETE action',
    () => {

      const action = new selectedAlertActions.LoadNoseNumbersCompleteAction([{
        'noseNumber': '3ML',
        'manufacturer': 'BOEING',
        'model': '738A',
        'serialNo': '31215',
        'totalShipTime': null,
        'cycles': null,
        'fleet': 'B737-NG'
      }]);

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE);
      expect(action.payload[0].noseNumber).toBe('3ML');
    });

  it('LoadNoseNumbersFailAction should handle LOAD_NOSE_NUMBERS_FAIL action',
    () => {
      const action = new selectedAlertActions.LoadNoseNumbersFailAction('ERROR');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadAircraftInfoAction should handle LOAD_AIRCRAFT_INFO action',
    () => {
      const action = new selectedAlertActions.LoadAircraftInfoAction('3');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO);
      expect(action.payload).toBe('3');
    });

  it('LoadAircraftInfoCompleteAction should handle LOAD_AIRCRAFT_INFO_COMPLETE action',
    () => {

      const action = new selectedAlertActions.LoadAircraftInfoCompleteAction({
        'noseNumber': '3ML',
        'manufacturer': 'BOEING',
        'model': '738A',
        'serialNo': '31215',
        'totalShipTime': null,
        'cycles': null,
        'fleet': 'B737-NG'
      });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE);
      expect(action.payload.noseNumber).toBe('3ML');
    });

  it('LoadAircraftInfoFailAction should handle LOAD_AIRCRAFT_INFO_FAIL action',
    () => {
      const action = new selectedAlertActions.LoadAircraftInfoFailAction('ERROR');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('SaveSdaAction should handle SAVE_SDA action',
    () => {
      const action = new selectedAlertActions.SaveSdaAction({ id: 1 });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.SAVE_SDA);
      expect(action.payload.id).toBe(1);
    });

  it('SaveSdaCompleteAction should handle SAVE_SDA_COMPLETE action',
    () => {

      const action = new selectedAlertActions.SaveSdaCompleteAction({
        newSda: false, sdaId: 1, sda: {}, Timestamp: new Date()
      });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.SAVE_SDA_COMPLETE);
      expect(action.payload.sdaId).toBe(1);
    });

  it('SaveSdaFailAction should handle SAVE_SDA_FAIL action',
    () => {
      const action = new selectedAlertActions.SaveSdaFailAction('ERROR');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.SAVE_SDA_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadSdasAction should handle LOAD_SDAS action',
    () => {
      const action = new selectedAlertActions.LoadSdasAction({ first: 0, rows: 20, sortField: '', sortOrder: 0 });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDAS);
      expect(action.payload.first).toBe(0);
    });

  it('LoadSdasCompleteAction should handle LOAD_SDAS_COMPLETE action',
    () => {
      const action = new selectedAlertActions.LoadSdasCompleteAction({ totalRecords: 2, records: [] });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDAS_COMPLETE);
      expect(action.payload.totalRecords).toBe(2);
    });

  it('LoadSdasFailAction should handle LOAD_SDAS_FAIL action',
    () => {
      const action = new selectedAlertActions.LoadSdasFailAction('ERROR');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDAS_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadSdaAction should handle LOAD_SDA action',
    () => {
      const action = new selectedAlertActions.LoadSdaAction({ sdaId: 1, version: 0, original: true });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDA);
      expect(action.payload.sdaId).toBe(1);
    });

  it('LoadSdaCompleteAction should handle LOAD_SDA_COMPLETE action',
    () => {
      const action = new selectedAlertActions.LoadSdaCompleteAction({ id: 1 });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDA_COMPLETE);
      expect(action.payload.id).toBe(1);
    });

  it('LoadSdaFailAction should handle LOAD_SDA_FAIL action',
    () => {
      const action = new selectedAlertActions.LoadSdaFailAction('ERROR');

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_SDA_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('LoadNewSdaAction should handle LOAD_NEW_SDA action',
    () => {
      const action = new selectedAlertActions.LoadNewSdaAction();

      expect(action.type).toBe(selectedAlertActions.ActionTypes.LOAD_NEW_SDA);
      expect(action.payload).toBeUndefined();
    });

  it('SetSdaNewStatusAction should handle SET_SDA_NEW_STATUS action',
    () => {
      const action = new selectedAlertActions.SetSdaNewStatusAction(models.Status.Complete);

      expect(action.type).toBe(selectedAlertActions.ActionTypes.SET_SDA_NEW_STATUS);
      expect(action.payload).toBe(models.Status.Complete);
    });
  it('SaveSdaSearchCriteria should handle SAVE_SDA_SEARCH_CRITERIA action',
    () => {
      const action = new selectedAlertActions.SaveSdaSearchCriteria(
        {
          pageData: undefined,
          searchByDateRange: undefined,
          searchBySda: undefined,
          searchByAircraft: undefined,
          searchByCorrosion: undefined,
          searchByCorrectiveAction: undefined,
          searchByDefect: undefined,
          searchByMaintenance: undefined,
          searchByReport: undefined,
          searchByCpcpDisposition: undefined,
          searchByDTE: undefined,
          searchByOptions: undefined,
          searchByPart: undefined,
          searchByStatus: undefined
        });

      expect(action.type).toBe(selectedAlertActions.ActionTypes.SAVE_SDA_SEARCH_CRITERIA);
      expect(action.payload.pageData).toBeUndefined();
    });



});
