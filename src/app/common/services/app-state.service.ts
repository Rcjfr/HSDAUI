import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import * as fromRoot from '../reducers';
import * as selectedAlertActions from '../actions/selected-alert';
import * as lookupDataActions from '../actions/lookup-data';
import * as userActions from '../actions/logged-in-user';
import { Observable, Subject } from 'rxjs/Rx';
import { IStation, ISda, ISavedState, Status } from '../models';

@Injectable()
export class AppStateService {
  private loadNewSdaSubject = new Subject<any>();
  private savedSdaSubject = new Subject<ISavedState>();

  constructor(private store: Store<AppStore>) { }
  getLookupDataLoading() {
    return this.store.select(fromRoot.getLookupDataLoading);
  }
  getAlertCodes() {
    return this.store.select(fromRoot.getAlertCodes);
  }
  getATACodes() {
    return this.store.select(fromRoot.getATACodes);
  }
  getDepartments() {
    return this.store.select(fromRoot.getDepartments);
  }
  getFleetCheckTypes() {
    return this.store.select(fromRoot.getFleetCheckTypes);
  }
  getCheckTypes() {
    return this.store.select(fromRoot.getCheckTypes);
  }
  getCorrosionLevels() {
    return this.store.select(fromRoot.getCorrosionLevels);
  }
  getCorrosionTypes() {
    return this.store.select(fromRoot.getCorrosionTypes);
  }
  getDetectionMethods() {
    return this.store.select(fromRoot.getDetectionMethods);
  }
  getStations(query: string): Observable<IStation[]> {
    const queryExp = new RegExp(query, 'ig');

    return this.store.select(fromRoot.getStations)
      //TODO: need to revisit for wildcard search
      //.map(station => station.filter(s => (query.length == 1 && s.stationIATACode.startsWith(query.toUpperCase())) ||
      //  (query.length > 1 && (queryExp.test(s.stationIATACode) || queryExp.test(s.stationDescription)))))
      .map(station => station.filter(s => s.stationIATACode.startsWith(query.toUpperCase())))
      .map(d => d && d.toJS());

  }
  getDamageTypes() {
    return this.store.select(fromRoot.getDamageTypes);
  }
  getCauseOfDamages() {
    return this.store.select(fromRoot.getCauseOfDamages);
  }
  getFloorboardConditions() {
    return this.store.select(fromRoot.getFloorboardConditions);
  }
  getRepairDescriptions() {
    return this.store.select(fromRoot.getRepairDescriptions);
  }
  getRepairDocuments() {
    return this.store.select(fromRoot.getRepairDocuments);
  }
  getReasonsForChange() {
    return this.store.select(fromRoot.getReasonsForChange);
  }
  getDTEStatus() {
    return this.store.select(fromRoot.getDTEStatus);
  }
  getRepairInspectionStatus() {
    return this.store.select(fromRoot.getRepairInspectionStatus);
  }
  getAircraftInfo() {
    return this.store.select(fromRoot.getAircraftInfo);
  }
  getSelectedSda() {
    return this.store.select(fromRoot.getSelectedSda);
  }
  getSelectedAlertLoading() {
    return this.store.select(fromRoot.getSelectedAlertLoading);
  }
  getSelectedAlertSavedState() {
    //return this.store.select(fromRoot.getSelectedAlertSavedState);
    return this.savedSdaSubject.asObservable();
  }
  getCurrentSdaId() {
    return this.store.select(fromRoot.getCurrentSdaId);
  }
  getLoadNewSdaState() {
    return this.loadNewSdaSubject.asObservable();
  }
  getSdaListResult() {
    return this.store.select(fromRoot.getSdaListResult);
  }
   getSearchCriteria() {
    return this.store.select(fromRoot.getSearchCriteria);
  }

  getUser() {
    return this.store.select(fromRoot.getUser);
  }

  //Dispatch Actions
  saveSda(sda: ISda): void {
    this.store.dispatch(new selectedAlertActions.SaveSdaAction(sda));
  }
  notifySavedSda(value: ISavedState) {
    this.savedSdaSubject.next(value);
  }
  loadNewSda(): void {
    this.loadNewSdaSubject.next({ load: true });
  }
  loadSdaList(pageData): void {
    this.store.dispatch(new selectedAlertActions.LoadSdasAction(pageData));
  }
  saveSdaSearchCriteria(criteria): void {
    this.store.dispatch(new selectedAlertActions.SaveSdaSearchCriteria(criteria));
  }
  loadSda(sdaId: number): void {
    this.store.dispatch(new selectedAlertActions.LoadSdaAction(sdaId));
  }
  loadAircraftInfo(noseNumber: string): void {
    if (!noseNumber) { return; }
    this.store.dispatch(new selectedAlertActions.LoadAircraftInfoAction(noseNumber));
  }
  loadNoseNumbers(filter: string = '') {
    this.store.dispatch(new selectedAlertActions.LoadNoseNumbersAction(filter));
  }
  loadCheckTypes() {
    this.store.dispatch(new lookupDataActions.LoadCheckTypesAction());
  }
  loadFleetCheckTypes(fleet: string) {
    this.store.dispatch(new lookupDataActions.LoadFleetCheckTypesAction(fleet));
  }
  loadLookupData() {
    this.store.dispatch(new lookupDataActions.LoadLookupDataAction());
  }
  loadUser() {
    this.store.dispatch(new userActions.LoadUserAction());
  }
  getUserLoading() {
    return this.store.select(fromRoot.getUserLoading);
  }
  setNewSdaStatus(status: Status) {
    return this.store.dispatch(new selectedAlertActions.SetSdaNewStatusAction(status));
  }
  getNewSdaStatus() {
    return this.store.select(fromRoot.getNewSdaStatus);
  }

  getSdaLoading() {
    return Observable.merge(this.getLookupDataLoading(), this.getUserLoading(), this.getSelectedAlertLoading());
  }
}
