import { ActionTypes } from './../actions/logged-in-user';
import { ActionReducer, Action } from '@ngrx/store';
import { IAlert, ISdaListView, Status } from '@app/common/models';
import { ISdaRecord, SdaFactory } from '@app/common/reducers/models/sda';
import { ISdaListResultRecord, SdaListResultFactory } from '@app/common/reducers/models/sda-list-result';
import { ISearchCriteriaRecord, SearchCriteriaRecordFactory } from '@app/common/reducers/models/search-criteria';

import { ISdaListResult, IAircraftInfo, IChangeLog } from '@app/common/models';
import { IAircraftInfoRecord, AircraftInfoFactory } from '@app/common/reducers/models/aircraft-info';
import { ATACodeRecord, ATACodeFactory } from '@app/common/reducers/models/ata-code';
import { ISavedStateRecord, SavedStateFactory } from '@app/common/reducers/models/saved-state';
import * as selectedAlertActions from '@app/common/actions/selected-alert';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  loading: boolean;
  loadingText: string;
  savedState: ISavedStateRecord,
  currentSdaId: number;
  loadNewSdaCounter: number,
  sda: ISdaRecord;
  newSdaStatus: Status;
  noseNumbers: List<IAircraftInfo>;
  changeLogs: List<IChangeLog>;
  aircraftInfo: IAircraftInfoRecord;
  sdaListResult: ISdaListResultRecord;
  searchCriteria: ISearchCriteriaRecord;
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  loadingText: 'Loading',
  savedState: null,
  loadNewSdaCounter: 0,
  currentSdaId: 0,
  sda: SdaFactory(),
  newSdaStatus: Status.Open,
  noseNumbers: List.of<IAircraftInfo>(),
  changeLogs: List.of<IChangeLog>(),
  aircraftInfo: AircraftInfoFactory(),
  sdaListResult: SdaListResultFactory(),
  //mrlSearchResult: SdaListResultFactory(),
  searchCriteria: SearchCriteriaRecordFactory()
});

function makeInitialState() {
  return stateFactory();
}

export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: selectedAlertActions.Actions) => {
  switch (action.type) {
    case selectedAlertActions.ActionTypes.LOAD_CHANGE_LOG:
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO:
    case selectedAlertActions.ActionTypes.SAVE_SDA:
    case selectedAlertActions.ActionTypes.LOAD_SDA:
    case selectedAlertActions.ActionTypes.LOAD_SDAS:
    case selectedAlertActions.ActionTypes.EXPORT_SDAS:
    case selectedAlertActions.ActionTypes.EXPORT_PDF:
      {
        return state.merge({ loading: true, loadingText: 'Loading' });
      }
    case selectedAlertActions.ActionTypes.DOWNLOAD_ATTACHMENT:
      {
        return state.merge({ loading: true, loadingText: 'Downloading' });
      }
    case selectedAlertActions.ActionTypes.UPLOAD_ATTACHMENT:
      {
        return state.merge({ loading: true, loadingText: 'Uploading' });
      }
    case selectedAlertActions.ActionTypes.LOAD_NEW_SDA:
      {
        return state.merge({ loadNewSdaCounter: state.loadNewSdaCounter + 1 });
      }
    case selectedAlertActions.ActionTypes.LOAD_SDA_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadSdaCompleteAction;

        return state.merge({ loading: false, currentSdaId: act.payload.id, newSdaStatus: act.payload.status, sda: act.payload.id ? SdaFactory(act.payload) : SdaFactory() });
      }
    case selectedAlertActions.ActionTypes.SAVE_SDA_SEARCH_CRITERIA:
      {
        const act = action as selectedAlertActions.SaveSdaSearchCriteria;
        const record = SearchCriteriaRecordFactory(act.payload);

        return state.merge({ loading: false, searchCriteria: record });
      }
    case selectedAlertActions.ActionTypes.EXPORT_SDAS_COMPLETE:
      {
        return state.merge({ loading: false });
      }
    case selectedAlertActions.ActionTypes.LOAD_SDAS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadSdasCompleteAction;

        return state.merge({ loading: false, sdaListResult: SdaListResultFactory(act.payload) });
      }

    case selectedAlertActions.ActionTypes.EXPORT_MRL_PDF_COMPLETE:
      {
        return state.merge({ loading: false });
      }
    case selectedAlertActions.ActionTypes.EXPORT_MRL_EXCEL_COMPLETE:
      {
        return state.merge({ loading: false });
      }

    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadAircraftInfoCompleteAction;

        return state.merge({ loading: false, aircraftInfo: AircraftInfoFactory(act.payload) });
      }
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL:
    case selectedAlertActions.ActionTypes.SAVE_SDA_FAIL:
    case selectedAlertActions.ActionTypes.DOWNLOAD_ATTACHMENT_COMPLETE:
    case selectedAlertActions.ActionTypes.UPLOAD_ATTACHMENT_COMPLETE:
    case selectedAlertActions.ActionTypes.EXPORT_PDF_COMPLETE:
      {
        return state.merge({ loading: false });
      }
    case selectedAlertActions.ActionTypes.SAVE_SDA_COMPLETE:
      {
        const act = action as selectedAlertActions.SaveSdaCompleteAction;

        return state.merge({
          loading: false,
          sda: SdaFactory(act.payload.sda),
          newSdaStatus: act.payload.sda.status,
          savedState: SavedStateFactory(act.payload),
          currentSdaId: act.payload.sdaId
        });
      }

    case selectedAlertActions.ActionTypes.LOAD_CHANGE_LOG_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadChangeLogCompleteAction;

        return state.merge({ loading: false, changeLogs: List.of(...act.payload) });
      }
    case selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadNoseNumbersCompleteAction;

        return state.merge({ loading: false, noseNumbers: List.of(...act.payload) });
      }
    case selectedAlertActions.ActionTypes.SET_SDA_NEW_STATUS:
      {
        const act = action as selectedAlertActions.SetSdaNewStatusAction;

        return state.merge({ newSdaStatus: act.payload });
      }
    case selectedAlertActions.ActionTypes.OPERATION_FAILED:
      {
        return state.merge({ loading: false });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSelectedSda = (state: State) => state.sda;
export const getSdaListResult = (state: State) => state.sdaListResult;
export const getLoading = (state: State) => state.loading;
export const getSavedState = (state: State) => state.savedState;
export const getLoadNewSdaState = (state: State) => state.loadNewSdaCounter;
export const getCurrentSdaId = (state: State) => state.currentSdaId;
export const getAircraftInfo = (state: State) => state.aircraftInfo;
export const getNoseNumbers = (state: State) => state.noseNumbers;
export const getChangeLog = (state: State) => state.changeLogs;
export const getSearchCriteria = (state: State) => state.searchCriteria;
export const getNewSdaStatus = (state: State) => state.newSdaStatus;
export const getLoadingText = (state: State) => state.loadingText;

