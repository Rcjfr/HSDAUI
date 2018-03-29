import * as fromSelectedAlert from './selected-alert';
import * as selectedAlert from '@app/common/actions/selected-alert';
import { AircraftInfoFactory } from '@app/common/reducers/models/aircraft-info';
import { SdaFactory } from '@app/common/reducers/models/sda';
import { List } from 'immutable';
import { ISda, ISdaListView, Status, IAircraftInfo, IChangeLog } from '@app/common/models';
import { ISavedStateRecord, SavedStateFactory } from '@app/common/reducers/models/saved-state';
import { ISdaListResult } from '@app/common/models';
import { ISdaListResultRecord, SdaListResultFactory } from '@app/common/reducers/models/sda-list-result';
import { ISearchCriteriaRecord, SearchCriteriaRecordFactory } from '@app/common/reducers/models/search-criteria';
import * as TypeMoq from 'typemoq';
import { ISearchCriteria } from '@app/common/models/search/search-criteria.model';

describe('selectedAlertReducer', () => {
  const initialState: fromSelectedAlert.State = {
    loading: false,
    loadingText: 'Loading',
    noseNumbersLoading: false,
    savedState: SavedStateFactory(),
    currentSdaId: 0,
    loadNewSdaCounter: 0,
    sda: SdaFactory(),
    newSdaStatus: Status.Open,
    noseNumbers: List.of<IAircraftInfo>(),
    changeLogs: List.of<IChangeLog>(),
    aircraftInfo: AircraftInfoFactory(),
    sdaListResult: SdaListResultFactory(),
    searchCriteria: SearchCriteriaRecordFactory()
  };
  const aircraftInfo = AircraftInfoFactory({
    noseNumber: 'A330',
    model: 'A330',
    manufacturer: 'Airbus',
    serialNo: '1234',
    totalShipTime: '123',
    cycles: '234',
    fleet: '330'
  });

  it('SelectedAlert Reducer Initial State', () => {
    const state = fromSelectedAlert.reducer(undefined, { type: null });
    expect(state.loading).toEqual(false);
    expect(state.noseNumbers.size).toEqual(0);
  });

  it('SelectedAlert Reducer Load Aircraft Info Success', () => {
    let state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadAircraftInfoAction({ noseNumber: 'A330', flightDate: new Date() }));
    expect(state.loading).toEqual(true);
    state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadAircraftInfoCompleteAction(aircraftInfo));
    expect(state.loading).toEqual(false);
    expect(state.aircraftInfo).toBeTruthy();
    expect(state.aircraftInfo.manufacturer).toEqual('Airbus');
    state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadAircraftInfoFailAction('Failed'));
    expect(state.loading).toEqual(false);
  });

  it('SelectedAlert Reducer Load Nose Numbers Info Success', () => {
    let state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadNoseNumbersAction('A'));
    expect(state.loading).toEqual(false);
    state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadNoseNumbersCompleteAction([
        {
          noseNumber: 'A330', cycles: '', fleet: '',
          manufacturer: '', model: '', serialNo: '', totalShipTime: ''
        },
        {
          noseNumber: 'A319', cycles: '', fleet: '',
          manufacturer: '', model: '', serialNo: '', totalShipTime: ''
        }]));
    expect(state.loading).toEqual(false);
    // console.log('nose numbers:', state.noseNumbers.size);
    const noseNumbers = fromSelectedAlert.getNoseNumbers(state); //changed getSelectedAlertNoseNumbers to getNoseNumbers
    expect(noseNumbers).toEqual(jasmine.any(List));
    expect(noseNumbers.size).toEqual(2);
    state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadNoseNumbersFailAction('FAIL'));
    expect(state.loading).toEqual(false);
  });

  it('LOAD_CHANGE_LOG,LOAD_AIRCRAFT_INFO,SAVE_SDA,LOAD_SDA,DOWNLOAD_ATTACHMENT,EXPORT_PDF Actions', () => {
    const state = fromSelectedAlert.reducer(fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadChangeLogAction({ sdaId: 1234, version: 4 }));
    expect(state.loading).toEqual(true);
  });
  it('LOAD_SDA_COMPLETE Action(Existing SDA)', () => {
    const state = fromSelectedAlert.reducer(fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadSdaCompleteAction({ id: 1234, status: 1 }));

    expect(state.loading).toEqual(false);
    expect(state.currentSdaId).toEqual(1234);
    expect(state.newSdaStatus).toEqual(1);
    expect(state.sda.id).toEqual(1234);
  });

  it('LOAD_SDA_COMPLETE Action(New SDA)', () => {
    const state = fromSelectedAlert.reducer(fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadSdaCompleteAction({}));

    expect(state.loading).toEqual(false);
    expect(state.currentSdaId).toBeUndefined();
    expect(state.newSdaStatus).toBeUndefined();
    expect(state.sda.id).toBe(0);
  });

  it('LOAD_NEW_SDA Action', () => {

    const state = fromSelectedAlert.reducer(fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadNewSdaAction());

    expect(state.loadNewSdaCounter).toEqual(initialState.currentSdaId + 1);

  });

  it('SAVE_SDA_SEARCH_CRITERIA Action', () => {
    // const mock: TypeMoq.IMock<ISearchCriteria> = TypeMoq.Mock.ofType<ISearchCriteria>(); // TODO
    const criteria: ISearchCriteria = {
      pageData: undefined,
      reportColumns: undefined,
      searchByAircraft: undefined,
      searchByCorrectiveAction: undefined,
      searchByCorrosion: undefined,
      searchByCpcpDisposition: undefined,
      searchByDateRange: undefined,
      searchByDefect: undefined,
      searchByDTE: undefined,
      searchByMaintenance: undefined,
      searchByOptions: undefined,
      searchByPart: undefined,
      searchBySda: undefined,
      searchByStatus: undefined
    };
    const state = fromSelectedAlert.reducer(fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.SaveSdaSearchCriteria(criteria)); //mock.object

    expect(state.loading).toEqual(false);
    expect(state.searchCriteria).not.toBeUndefined(false);

  });
});
