import * as fromSelectedAlert from './selected-alert';
import * as selectedAlert from '../actions/selected-alert';
import { aircraftInfoFactory } from './models/aircraft-info';
import { sdaFactory } from './models/sda';
import { List } from 'immutable';
import { ISda, ISdaListView } from '../models';
import { SavedStateRecord, SavedStateFactory } from './models/saved-state';

describe('selectedAlertReducer', () => {
  const initialState: fromSelectedAlert.State = {
    loading: false,
    savedState: SavedStateFactory(),
    currentSdaId: 0,
    loadNewSdaCounter: 0,
    sda: sdaFactory(),
    noseNumbers: <List<string>>List.of(),
    aircraftInfo: aircraftInfoFactory(),
    sdaList: <List<ISdaListView>>List.of(),
  };
  const aircraftInfo = aircraftInfoFactory({
    aircraftNo: 'A330',
    model: 'A330',
    manufacturer: 'Airbus',
    serialNo: '1234',
    totalShipTime: '123',
    cycles: '234',
    fleet: '330'
  });

  it('SelectedAlert Reducer Initial State', () => {
    const state = fromSelectedAlert.reducer(undefined, { type: null, payload: null });
    expect(state.loading).toEqual(false);
    expect(state.noseNumbers.size).toEqual(0);
  });

  it('SelectedAlert Reducer Load Aircraft Info Success', () => {
    let state = fromSelectedAlert.reducer(
      fromSelectedAlert.stateFactory(initialState),
      new selectedAlert.LoadAircraftInfoAction('A330'));
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
      new selectedAlert.LoadNoseNumbersCompleteAction(['A330', 'A319']));
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

  xit('selectedAlert Reducer Other', () => {
    // let state  = fromSelectedAlert.reducer({type:'some other action',});

    // expect(state.loading).toEqual(false);
  });
});
