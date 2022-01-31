/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/common/store/app-store';
import * as fromRoot from '@app/common/reducers';
import * as selectedAlertActions from '@app/common/actions/selected-alert';
import * as lookupDataActions from '@app/common/actions/lookup-data';
import * as userActions from '@app/common/actions/logged-in-user';
import { IStation, ISda, ISavedState, Status, IAircraftInfo, ILazyLoadEvent, IChangeLog, IBaseLookUp, IATACode, ICheckType, SearchType } from '@app/common/models';
import { List } from 'immutable';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';
import { IAircraftInfoRecord } from '@app/common/reducers/models/aircraft-info';
import { ISdaRecord } from '@app/common/reducers/models/sda';
import { ISdaListResultRecord } from '@app/common/reducers/models/sda-list-result';
import { ISearchCriteriaRecord } from '@app/common/reducers/models/search-criteria';
import { IUserRecord } from '@app/common/reducers/models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppStateService {
  private loadNewSdaSubject = new Subject<any>();
  private savedSdaSubject = new Subject<ISavedState>();

  constructor(private store: Store<AppStore>) { }

  getLookupDataLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getLookupDataLoading);
  }

  getAlertCodes(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getAlertCodes);
  }

  getATACodes(): Observable<IATACode[]> {
    return this.store.select(fromRoot.getATACodes);
  }

  getDepartments(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getDepartments);
  }

  getFleetCheckTypes(): Observable<List<ICheckType>> {
    return this.store.select(fromRoot.getFleetCheckTypes);
  }

  getCheckTypes(): Observable<ICheckType[]> {
    return this.store.select(fromRoot.getCheckTypes);
  }

  getCorrosionLevels(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getCorrosionLevels);
  }

  getCorrosionTypes(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getCorrosionTypes);
  }

  getDetectionMethods(): Observable<IBaseLookUp[]> {
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


  getDamageTypes(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getDamageTypes);
  }
  getCauseOfDamages(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getCauseOfDamages);
  }

  getFloorboardConditions(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getFloorboardConditions);
  }

  getRepairDescriptions(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getRepairDescriptions);
  }
  getRepairDocuments(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getRepairDocuments);
  }

  getReasonsForChange(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getReasonsForChange);
  }

  getDTEStatus(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getDTEStatus);
  }

  getSdaStatus(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getSdaStatus);
  }

  getRepairInspectionStatus(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getRepairInspectionStatus);
  }

  getFleet(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getFleet);
  }

  getDTERepairStatus(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getDTERepairStatus);
  }

  getDTEComponentType(): Observable<IBaseLookUp[]> {
    return this.store.select(fromRoot.getDTEComponentType);
  }

  getAircraftInfo(): Observable<IAircraftInfoRecord> {
    return this.store.select(fromRoot.getAircraftInfo);
  }

  getSelectedSda(): Observable<ISdaRecord> {
    return this.store.select(fromRoot.getSelectedSda);
  }

  getSelectedAlertLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getSelectedAlertLoading);
  }

  getSelectedAlertSavedState() {
    //return this.store.select(fromRoot.getSelectedAlertSavedState);
    return this.savedSdaSubject.asObservable();
  }

  getCurrentSdaId(): Observable<number> {
    return this.store.select(fromRoot.getCurrentSdaId);
  }

  getLoadNewSdaState() {
    return this.loadNewSdaSubject.asObservable();
  }
  getSdaListResult(): Observable<ISdaListResultRecord> {
    return this.store.select(fromRoot.getSdaListResult);
  }

  getSearchCriteria(): Observable<ISearchCriteriaRecord> {
    return this.store.select(fromRoot.getSearchCriteria);
  }

  getUser(): Observable<IUserRecord> {
    return this.store.select(fromRoot.getUser);
  }


  getTwdList(): Observable<ISdaListResultRecord> {
    return this.store.select(fromRoot.getReportSearchResult);
  }

  getSearchType(): Observable<SearchType> {
    return this.store.select(fromRoot.getSearchType);
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

  saveSearchType(SearchType: SearchType  ): void {
    this.store.dispatch(new selectedAlertActions.SaveSearchTypeAction(SearchType));
  }

  loadSdaList(pageData: ILazyLoadEvent): void {
    this.store.dispatch(new selectedAlertActions.LoadSdasAction(pageData));
  }

  loadMajorRepairList(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportMrlPdfAction(criteria));
  }

  loadTwdList(criteria): void {
    this.store.dispatch(new selectedAlertActions.LoadTwdListAction(criteria));
  }

  exportTwdExcel(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportTwdExcelAction(criteria));
  }

  exportTwdPdf(criteria): void {
    this.store.dispatch(new selectedAlertActions.ExportTwdPdfAction(criteria));
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

  loadNoseNumbers(filter = '') {
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
  logout() {
    this.store.dispatch(new userActions.LogOutAction());
  }

  getUserLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getUserLoading);
  }

  setNewSdaStatus(status: Status) {
    return this.store.dispatch(new selectedAlertActions.SetSdaNewStatusAction(status));
  }

  getNewSdaStatus(): Observable<Status> {
    return this.store.select(fromRoot.getNewSdaStatus);
  }
  getLoadingText(): Observable<string> {
    return this.store.select(fromRoot.getLoadingText);
  }
  getNoseNumbersLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getNoseNumbersLoading);
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
  exportMrrPDF(sdas: number[], pageData: ILazyLoadEvent) {
    this.store.dispatch(new selectedAlertActions.ExportMrrPDFAction({ sdaIds: sdas, pageData }));
  }
}
