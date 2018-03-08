import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/common/store/app-store';
import * as fromRoot from '@app/common/reducers';
import * as selectedAlertActions from '@app/common/actions/selected-alert';
import * as lookupDataActions from '@app/common/actions/lookup-data';
import * as userActions from '@app/common/actions/logged-in-user';
import { Observable, Subject } from 'rxjs/Rx';
import { IStation, ISda, ISavedState, Status, IAircraftInfo, ILazyLoadEvent, IChangeLog } from '@app/common/models';
import { List } from 'immutable';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';

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
    return this.store.select(fromRoot.getStations)
      .map(d => d && d.toJS());
  }

  getNoseNumbers(): Observable<Array<IAircraftInfo>> {
    return this.store.select(fromRoot.getNoseNumbers).map(d => d && d.toJS());
  }

  getChangeLog(): Observable<List<IChangeLog>> {
    return this.store.select(fromRoot.getChangeLog);
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

  loadSdaList(pageData: ILazyLoadEvent): void {
    this.store.dispatch(new selectedAlertActions.LoadSdasAction(pageData));
  }

  loadMajorRepairList(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportMrlPdfAction(criteria));
  }

  exportMRLExcel(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportMrlExcelAction(criteria));
  }

  saveSdaSearchCriteria(criteria): void {
    this.store.dispatch(new selectedAlertActions.SaveSdaSearchCriteria(criteria));
  }

  exportSDA(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportSdasAction(criteria));
  }

  uploadAttachment(): void {
    this.store.dispatch(new selectedAlertActions.UploadAttachmentAction());
  }
  uploadAttachmentComplete(): void {
    this.store.dispatch(new selectedAlertActions.UploadAttachmentCompleteAction());
  }
  uploadAttachmentFail(message: string): void {
    this.store.dispatch(new selectedAlertActions.UploadAttachmentFailAction(message));
  }


  loadSda(payload: number | ILoadSda): void {
    const pl = typeof payload === 'number' ? { sdaId: payload, version: 0, original: false } : payload;
    this.store.dispatch(new selectedAlertActions.LoadSdaAction(pl));
  }

  loadAircraftInfo(noseNumber: string, flightDate: Date): void {
    if (!noseNumber) { return; }
    this.store.dispatch(new selectedAlertActions.LoadAircraftInfoAction({ noseNumber: noseNumber, flightDate: flightDate }));
  }



  loadChangelog(changelog: ILoadChangeLog) {
    this.store.dispatch(new selectedAlertActions.LoadChangeLogAction(changelog));
  }

  loadNoseNumbers(filter: string = '') {
    this.store.dispatch(new selectedAlertActions.LoadNoseNumbersAction(filter));
  }



  loadFleetCheckTypes(fleet: string) {
    this.store.dispatch(new lookupDataActions.LoadFleetCheckTypesAction(fleet));
  }

  loadStations(token: string) {
    this.store.dispatch(new lookupDataActions.LoadStationsAction(token));
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
  getLoadingText() {
    return this.store.select(fromRoot.getLoadingText);
  }
  getSdaLoading() {
    return Observable.combineLatest(
      this.getLookupDataLoading(),
      this.getUserLoading(),
      this.getSelectedAlertLoading(), (a, b, c) => {
        return a || b || c;
      });
  }

  downloadAttachment(sdaid: number, attachmentPath: string, attachmentName: string) {
    this.store.dispatch(new selectedAlertActions.DownloadAttachmentAction({ sdaId: sdaid, attachmentPath: attachmentPath, attachmentName: attachmentName }));
  }
  exportPDF(sdas: [number]) {
    this.store.dispatch(new selectedAlertActions.ExportPDFAction(sdas));
  }
}
