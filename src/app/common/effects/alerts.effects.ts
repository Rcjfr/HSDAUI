import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as selectedAlert from '@app/common/actions/selected-alert';
import * as services from '@app/common/services';
import * as models from '@app/common/models';
import * as fromRoot from '@app/common/reducers';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';
import { IDownloadAttachment } from '@app/common/models/payload/download-attachment.model';
import { IAircraftInfoPayload } from '@app/common/models/payload/aircraft-info-payload.model';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ISearchCriteria } from '@app/common/models/search/search-criteria.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AlertEffects {

  @Effect()
  loadNoseNumbers$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS)
    .pipe(
    map((action: selectedAlert.LoadNoseNumbersAction) => action.payload),
    switchMap((search: string) => {
      return this.aircraftService.queryNoseNumbers(search)
        .pipe(
        map((data: models.IAircraftInfo[]) => {
          return new selectedAlert.LoadNoseNumbersCompleteAction(data);
        }),
        catchError((err) => {
          return of(new selectedAlert.LoadNoseNumbersFailAction('Failed to load Nose Numbers'));
        }));
    })
    );

  @Effect()
  loadAircraftInfo$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO)
    .pipe(
    map((action: selectedAlert.LoadAircraftInfoAction) => action.payload),
    switchMap((payLoad: IAircraftInfoPayload) => {
      return this.aircraftService.getAircraftInfo(payLoad)
        .pipe(
        map((aircraftInfo: models.IAircraftInfo) => {
          return new selectedAlert.LoadAircraftInfoCompleteAction(aircraftInfo);
        }),
        catchError((err) => {
          return Observable.from([
            new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft information. Please check the aircraft # or try again by clicking refresh button.'),
            new selectedAlert.LoadAircraftInfoCompleteAction(
              {
                noseNumber: payLoad.noseNumber,
                registrationNumber: '',
                cycles: '', fleet: '', manufacturer: '',
                model: '', serialNo: '', totalShipTime: ''
              })]);
        })
        );
    })
    );

  @Effect()
  loadChangelog$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_CHANGE_LOG)
    .pipe(
    map((action: selectedAlert.LoadChangeLogAction) => action.payload),
    switchMap((payload: ILoadChangeLog) => {
      return this.changeLogService.getChangeLog(payload.sdaId, payload.version)
        .pipe(
        map((changeLogInfo: models.IChangeLog[]) => {
          return new selectedAlert.LoadChangeLogCompleteAction(changeLogInfo);
        }),
        catchError((err) => {
          return Observable.from([
            new selectedAlert.LoadChangeLogFailAction('Failed to load change log information. Please check sdaid / Version #  or try again by clicking refresh button.')
          ]);
        })
        );
    })
    );

  @Effect()
  saveSda$ = this.actions$
    .ofType(selectedAlert.ActionTypes.SAVE_SDA)
    .pipe(
    map((action: selectedAlert.SaveSdaAction) => action.payload),
    switchMap((sda: models.ISda) => {
      return this.sdaService.saveSda(sda)
        .pipe(
        map((updatedSda: models.ISda) => {
          this.appStateService.notifySavedSda({ sdaId: updatedSda.id, newSda: !sda.id, Timestamp: new Date() });

          return new selectedAlert.SaveSdaCompleteAction({ sda: updatedSda, sdaId: updatedSda.id, newSda: !sda.id, Timestamp: new Date() });
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 409) {
            return of(new selectedAlert.SaveSdaFailAction(`Failed to save SDA.SDA ID ${sda.id} is already updated by another user.Please refresh the page and try again.`));
          }

          return of(new selectedAlert.SaveSdaFailAction(`Failed to save SDA.${err.error || 'Please contact application administrator.'}`));
        })
        );
    })
    );

  //TODO - Melinda saving for research
  // @Effect()
  //   saveSearchCriteria$: Observable<Action> = this.actions$
  //     .ofType(selectedAlert.ActionTypes.SAVE_SDA_SEARCH_CRITERIA)
  //     // .map((action: selectedAlert.SaveSdaSearchCriteria) => action.payload)
  //    .map(action => { return new selectedAlert.LoadSdasAction(undefined) } );
  //     // .switchMap((searchCriteria) => {
  //     //   return new selectedAlert.LoadSdasAction(undefined);
  //     //   // return new selectedAlert.LoadSdasAction(searchCriteria.toJS());
  //     // });

  @Effect()
  loadSdas$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDAS)
    .pipe(
    map((action: selectedAlert.LoadSdasAction) => action.payload),
    withLatestFrom(this.appStateService.getSearchCriteria()),
    withLatestFrom(this.appStateService.getSearchType()),
    switchMap(([[payload, searchCriteria], searchType]) => {
      const criteria = searchCriteria.toJS();
      criteria.pageData = payload;
      if (searchType === models.SearchType.MRR) {
        if (!criteria['searchByCorrectiveAction']) {
          criteria['searchByCorrectiveAction'] = {};
        }
        criteria['searchByCorrectiveAction']['isMajorRepair'] = 1;
        // In case of MRR, Look for only Closed status(ignore any other status user selects)
        criteria['searchByStatus'] = { status: [models.Status.Closed] };
      }

      return this.sdaService.searchSda(criteria)
        .pipe(
        map((data: models.ISdaListResult) => {
          return new selectedAlert.LoadSdasCompleteAction(data);
        }),
        catchError((err) => {
          return of(new selectedAlert.LoadSdasFailAction('Failed to load SDAs.'));
        })
        );
    })
    );


    @Effect()
    loadTwdList$ = this.actions$
      .ofType(selectedAlert.ActionTypes.LOAD_TWD_LIST)
      .pipe(
      map((action: selectedAlert.LoadTwdListAction) => action.payload ),
      switchMap((searchCriteria: ISearchCriteria) => {
        return this.sdaService.searchSda(searchCriteria)
          .pipe(
            switchMap((data: models.ISdaListResult) => {

            return of(new selectedAlert.LoadTwdListCompleteAction(data));

          }),
          catchError((err) => {
            return of(new selectedAlert.LoadTwdListFailAction('Failed to load TWD data.'));
          })
          );
      })
      );

      @Effect()
      exportTwdExcel$ = this.actions$
        .ofType(selectedAlert.ActionTypes.EXPORT_TWD_EXCEL)
        .pipe(
        map((action: selectedAlert.ExportTwdExcelAction) => action.payload),
        switchMap(searchCriteria => {

          return this.sdaService.exportTwdExcel(searchCriteria)
            .pipe(
            map(result => {
              return new selectedAlert.ExportTwdExcelCompleteAction();
            }),
            catchError((err) => {

               return of(new selectedAlert.ExportTwdExcelFailAction('Failed to generate Time When Due Report.'));
            }));
        })
        );

        @Effect()
        exportTwdPDF$ = this.actions$
          .ofType(selectedAlert.ActionTypes.EXPORT_TWD_PDF)
          .pipe(
          map((action: selectedAlert.ExportTwdExcelAction) => action.payload),
          switchMap((searchCriteria: ISearchCriteria) => {
            return this.sdaService.searchSda(searchCriteria)
              .pipe(
              switchMap((searchResult: models.ISdaListResult) => {
                {
                  this.twdExportService.exportTwdPdf(searchResult);

                  return Observable.from([new selectedAlert.ExportTwdPdfCompleteAction()]);
                }

              }),
              catchError((err) => {
                console.log(err);

                return of(new selectedAlert.ExportTwdPdfFailAction('Failed to generate Time When Due Report'));
              }));
          })
          );

  @Effect()
  exportMrlPDF$ = this.actions$
    .ofType(selectedAlert.ActionTypes.EXPORT_MRL_PDF)
    .pipe(
    map((action: selectedAlert.ExportMrlPdfAction) => action.payload),
    switchMap((searchCriteria: ISearchCriteria) => {
      return this.sdaService.searchSda(searchCriteria)
        .pipe(
        switchMap((searchResult: models.ISdaListResult) => {
          if (searchResult.records.length === 0) {

            const aircraftPayload: IAircraftInfoPayload = { noseNumber: searchCriteria.searchByAircraft.aircraftNo, flightDate: new Date() }

            return this.aircraftService.getAircraftInfo(aircraftPayload)
              .pipe(
              switchMap((aircraftInfo: models.IAircraftInfo) => {
                this.mrlExportService.exportMrlPdf(searchResult);

                return Observable.from([new selectedAlert.ExportMrlPdfCompleteAction()]);
              }),
              catchError((err) => {
                return Observable.from([
                  new selectedAlert.LoadAircraftInfoFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.')])
              }));
          } else {

            this.mrlExportService.exportMrlPdf(searchResult);

            return Observable.from([new selectedAlert.ExportMrlPdfCompleteAction()]);
          }

        }),
        catchError((err) => {

          return of(new selectedAlert.ExportMrlPdfFailAction('Failed to generate Major Repair List.'));
        }));
    })
    );


  @Effect()
  exportMrlExcel$ = this.actions$
    .ofType(selectedAlert.ActionTypes.EXPORT_MRL_EXCEL)
    .pipe(
    map((action: selectedAlert.ExportMrlExcelAction) => action.payload),
    switchMap(searchCriteria => {
      return this.sdaService.exportMrlExcel(searchCriteria)
        .pipe(
        map(result => {
          return new selectedAlert.ExportMrlExcelCompleteAction();
        }),
        catchError((err) => {
          if (err.status === 400) {

            return of(new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.'));

            // const reader = new FileReader();

            //return of(new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.'));

            // reader.onload =  () => {
            //   const message = JSON.parse(reader.result).message;
            //  // console.log(message)
            //     if (message === 'Failed to verify Aircraft Nose#') {
            //       console.log(message);

            //       return of(new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.'));

            //     //  return new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.');
            //     }

            //    // return new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.');
            // };
            // reader.readAsText(err.error);
            // console.log(reader.result);
            // const message = JSON.parse(reader.result).message;
            // if (message === 'Failed to verify Aircraft Nose#') {
            //         console.log(message);

            //         return of(new selectedAlert.ExportMrlExcelFailAction('Failed to verify Aircraft Nose#. Please check the aircraft Nose # or try again later.'));

            //       }

          }

          return of(new selectedAlert.ExportMrlExcelFailAction('Failed to generate Major Repair List.'));
        }));
    })
    );


      @Effect()
      exportMrrPdf$ = this.actions$.
        ofType(selectedAlert.ActionTypes.EXPORT_MRR_PDF)
        .pipe(
        map((action: selectedAlert.ExportMrrPDFAction) => action.payload),
        withLatestFrom(this.appStateService.getSearchCriteria()),
        withLatestFrom(this.appStateService.getSearchType()),
        switchMap(([[payload, searchCriteria], searchType]) => {
              const criteria = searchCriteria.toJS();
              const sdas = payload.sdaIds;
              criteria.pageData = {
                first: 0,
                rows: -1,
                sortField: payload.pageData.sortField || 'createDate',
                sortOrder: payload.pageData.sortOrder || -1
              }
              if (searchType === models.SearchType.MRR) {
                if (!criteria['searchByCorrectiveAction']) {
                  criteria['searchByCorrectiveAction'] = {};
                }
                criteria['searchByCorrectiveAction']['isMajorRepair'] = 1;
                // In case of MRR, Look for only Closed status(ignore any other status user selects)
                criteria['searchByStatus'] = { status: [models.Status.Closed] };
              }

          return  this.mrrExportService.exportMrrPdf(criteria, sdas)
            .pipe(
            map((data: any) => {
              return new selectedAlert.ExportMrrPDFCompleteAction();
            }),
            catchError((err) => {
              return of(new selectedAlert.ExportMrrPDFFailAction('Failed to export to PDF.Please contact Administrator.'));
            }));
        }));

  @Effect()
  exportSdas$ = this.actions$
    .ofType(selectedAlert.ActionTypes.EXPORT_SDAS)
    .pipe(
    map((action: selectedAlert.ExportSdasAction) => action.payload),
    switchMap(searchCriteria => {
      return this.sdaService.searchSda(searchCriteria, true)
        .pipe(
        map((data: any) => {
          return new selectedAlert.ExportSdasCompleteAction();
        }),
        catchError((err) => {
          return of(new selectedAlert.ExportSdasFailAction('Failed to export SDAs.'));
        }));
    }));



  @Effect()
  loadSda$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDA)
    .pipe(
    map((action: selectedAlert.LoadSdaAction) => action.payload),
    switchMap((payload: ILoadSda) => {
      if (payload.sdaId === 0) {
        return of(new selectedAlert.LoadSdaCompleteAction({}));
      }

      return this.sdaService.getSda(payload)
        .pipe(
        map((data: models.ISda) => {
          if (payload.original && !data) {
            this.router.navigate(['/alerts', payload.sdaId]);

            return new selectedAlert.LoadSdaCompleteAction({});
          }

          return new selectedAlert.LoadSdaCompleteAction(data);
        }),
        catchError((err) => {
          return of(new selectedAlert.LoadSdaFailAction('Failed to load SDA.'));
        }));
    }));

  //@Effect() navigateHome$: any = this.actions$
  //  .ofType(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE)
  //  .map((action: selectedAlert.SaveSdaCompleteAction) =>this.toastr.success('SDA Details saved successfully.', 'Success'));

  @Effect()
  exportPDF$ = this.actions$.
    ofType(selectedAlert.ActionTypes.EXPORT_PDF)
    .pipe(
    map((action: selectedAlert.ExportPDFAction) => action.payload),
    switchMap((payload: number[]) => {
      return this.sdaExportService.exportSda(payload)
        .pipe(
        map((data: any) => {
          return new selectedAlert.ExportPDFCompleteAction();
        }),
        catchError((err) => {
          return of(new selectedAlert.ExportPDFFailAction('Failed to export to PDF.Please contact Administrator.'));
        }));
    }));

  @Effect()
  downloadAttachment$ = this.actions$.
    ofType(selectedAlert.ActionTypes.DOWNLOAD_ATTACHMENT)
    .pipe(
    map((action: selectedAlert.DownloadAttachmentAction) => action.payload),
    switchMap((payload: IDownloadAttachment) => {
      return this.sdaService.downloadAttachment(payload.sdaId, payload.attachmentPath, payload.attachmentName)
        .pipe(
        map((data: any) => {
          return new selectedAlert.DownloadAttachmentCompleteAction();
        }),
        catchError((err) => {
          return of(new selectedAlert.DownloadAttachmentFailAction('Failed to download attachment.Please try again after sometime or contact Administrator.'));
        }));
    })
    );
  @Effect()
  showToastrError$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL,
    selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL,
    selectedAlert.ActionTypes.SAVE_SDA_FAIL,
    selectedAlert.ActionTypes.LOAD_SDAS_FAIL,
    selectedAlert.ActionTypes.LOAD_TWD_LIST_FAIL,
    selectedAlert.ActionTypes.EXPORT_TWD_EXCEL_FAIL,
    selectedAlert.ActionTypes.EXPORT_TWD_PDF_FAIL,
    selectedAlert.ActionTypes.EXPORT_MRL_PDF_FAIL,
    selectedAlert.ActionTypes.EXPORT_MRR_PDF_FAIL,
    selectedAlert.ActionTypes.EXPORT_MRL_EXCEL_FAIL,
    selectedAlert.ActionTypes.LOAD_CHANGE_LOG_FAIL,
    selectedAlert.ActionTypes.EXPORT_SDAS_FAIL,
    selectedAlert.ActionTypes.DOWNLOAD_ATTACHMENT_FAIL,
    selectedAlert.ActionTypes.UPLOAD_ATTACHMENT_FAIL,
    selectedAlert.ActionTypes.EXPORT_PDF_FAIL
    ).pipe(
    map(toPayload),
    switchMap((payload: string) => {
      this.toastr.error(payload, 'ERROR');

      return of(new selectedAlert.OperationFailedAction());
    }));

  @Effect({ dispatch: false })
  showLoadSdaFailError$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDA_FAIL)
    .pipe(
    map(toPayload),
    map((payload: string) => {
      this.toastr.error(payload, 'ERROR');
      this.router.navigate(['/alerts']);

      return null;
    }));

  constructor(private actions$: Actions,
    private aircraftService: services.AircraftService,
    private sdaService: services.SdaService,
    private sdaExportService: services.SdaExportService,
    private mrlExportService: services.MrlExportService,
    private twdExportService: services.TwdExportService,
    private mrrExportService: services.MrrExportService,
    private changeLogService: services.ChangeLog,
    private appStateService: services.AppStateService,
    private router: Router,
    private toastr: ToastrService) {
  }

}
