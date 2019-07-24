import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';
import { ISdaListResult, SearchType } from '@app/common/models';
import { ISearchCriteria } from '@app/common/models/search/search-criteria.model';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';
import { IDownloadAttachment } from '@app/common/models/payload/download-attachment.model';
import { IAircraftInfoPayload } from '@app/common/models/payload/aircraft-info-payload.model';

export const ActionTypes = {
  LOAD_NOSE_NUMBERS: 'Load Nose Numbers',
  LOAD_NOSE_NUMBERS_COMPLETE: 'Load Nose Numbers Complete',
  LOAD_NOSE_NUMBERS_FAIL: 'Load Nose Numbers Fail',
  LOAD_AIRCRAFT_INFO: 'Load Aircraft Info',
  LOAD_AIRCRAFT_INFO_COMPLETE: 'Load Aircraft Info Complete',
  LOAD_AIRCRAFT_INFO_FAIL: 'Load Aircraft Info Fail',
  SAVE_SDA: 'Save SDA',
  SAVE_SDA_COMPLETE: 'Save SDA Complete',
  SAVE_SDA_FAIL: 'Save SDA Fail',
  LOAD_SDAS: 'Load SDAs',
  LOAD_SDAS_COMPLETE: 'Load SDAs Complete',
  LOAD_SDAS_FAIL: 'Load SDAs Fail',

  EXPORT_MRL_PDF: 'Export Major Repair List PDF',
  EXPORT_MRL_PDF_COMPLETE: 'Export Major Repair List PDF Complete',
  EXPORT_MRL_PDF_FAIL: 'Export Major Repair List PDF Fail',


  EXPORT_MRL_EXCEL: 'Export Major Repair List Excel',
  EXPORT_MRL_EXCEL_COMPLETE: 'Export Major Repair List Excel Complete',
  EXPORT_MRL_EXCEL_FAIL: 'Export Major Repair List Excel Fail',

  LOAD_TWD_LIST: 'Load TWD List',
  LOAD_TWD_LIST_COMPLETE: 'Load TWD List Complete',
  LOAD_TWD_LIST_FAIL: 'Load TWD List Fail',

  EXPORT_TWD_EXCEL: 'Export TWD Excel',
  EXPORT_TWD_EXCEL_COMPLETE: 'Export TWD Excel Complete',
  EXPORT_TWD_EXCEL_FAIL: 'Export TWD Excel Fail',

  EXPORT_TWD_PDF: 'Export TWD PDF',
  EXPORT_TWD_PDF_COMPLETE: 'Export TWD PDF Complete',
  EXPORT_TWD_PDF_FAIL: 'Export TWD PDF Fail',

  EXPORT_SDAS: 'Export SDAs',
  EXPORT_SDAS_COMPLETE: 'Export SDAs Complete',
  EXPORT_SDAS_FAIL: 'Export SDAs Fail',

  LOAD_SDA: 'Load SDA',
  LOAD_SDA_COMPLETE: 'Load SDA Complete',
  LOAD_SDA_FAIL: 'Load SDA Fail',
  LOAD_SDA_ORIGINAL: 'Load SDA Original',
  LOAD_SDA_ORIGINAL_COMPLETE: 'Load SDA Original Complete',
  LOAD_SDA_ORIGINAL_FAIL: 'Load SDA Original Fail',
  LOAD_NEW_SDA: 'Load New SDA',
  SAVE_SDA_SEARCH_CRITERIA: 'Update SDA Search Criteria',
  SET_SDA_NEW_STATUS: 'Set SDA new status',
  OPERATION_FAILED: 'General Operation Failed Message',
  LOAD_CHANGE_LOG: 'Load Change log Info',
  LOAD_CHANGE_LOG_COMPLETE: 'Load Change log Info complete',
  LOAD_CHANGE_LOG_FAIL: 'Load Change log Info fail',

  UPLOAD_ATTACHMENT: 'Upload SDA Attachment',
  UPLOAD_ATTACHMENT_COMPLETE: 'Upload SDA Attachment complete',
  UPLOAD_ATTACHMENT_FAIL: 'Upload SDA Attachment fail',

  DOWNLOAD_ATTACHMENT: 'Download SDA Attachment',
  DOWNLOAD_ATTACHMENT_COMPLETE: 'Download SDA Attachment complete',
  DOWNLOAD_ATTACHMENT_FAIL: 'Download SDA Attachment fail',

  EXPORT_PDF: 'Export PDF',
  EXPORT_PDF_COMPLETE: 'Export PDF Complete',
  EXPORT_PDF_FAIL: 'Export PDF Fail',
  SAVE_SEARCH_TYPE: 'Update flag to show grid based on search Type',
  EXPORT_MRR_PDF: 'Export MRR PDF',
  EXPORT_MRR_PDF_COMPLETE: 'Export MRR PDF Complete',
  EXPORT_MRR_PDF_FAIL: 'Export MRR PDF Fail',

};

export class OperationFailedAction implements Action {
  public type = ActionTypes.OPERATION_FAILED;
  public payload: any
  constructor() { }
}

export class LoadNoseNumbersAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS;
  public payload: string
  constructor(token: string) {
    this.payload = token;
  }
}
export class LoadNoseNumbersCompleteAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE;
  constructor(public payload: Array<models.IAircraftInfo>) { }
}
export class LoadNoseNumbersFailAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS_FAIL;
  constructor(public payload: any) { }
}

export class LoadAircraftInfoAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO;
  constructor(public payload: IAircraftInfoPayload) { }
}
export class LoadAircraftInfoCompleteAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE;
  constructor(public payload: models.IAircraftInfo) { }
}
export class LoadAircraftInfoFailAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO_FAIL;
  constructor(public payload: any) { }
}

export class LoadChangeLogAction implements Action {
  public type = ActionTypes.LOAD_CHANGE_LOG;
  constructor(public payload: ILoadChangeLog) { }
}
export class LoadChangeLogCompleteAction implements Action {
  public type = ActionTypes.LOAD_CHANGE_LOG_COMPLETE;
  constructor(public payload: Array<models.IChangeLog>) { }
}
export class LoadChangeLogFailAction implements Action {
  public type = ActionTypes.LOAD_CHANGE_LOG_FAIL;
  constructor(public payload: any) { }
}

export class SaveSdaAction implements Action {
  public type = ActionTypes.SAVE_SDA;
  constructor(public payload: models.ISda) { }
}
export class SaveSdaCompleteAction implements Action {
  public type = ActionTypes.SAVE_SDA_COMPLETE;
  constructor(public payload: models.ISavedState) { }
}
export class SaveSdaFailAction implements Action {
  public type = ActionTypes.SAVE_SDA_FAIL;
  constructor(public payload: any) { }
}

export class LoadSdasAction implements Action {
  public type = ActionTypes.LOAD_SDAS;
  constructor(public payload: models.ILazyLoadEvent) { }
}

export class LoadSdasCompleteAction implements Action {
  public type = ActionTypes.LOAD_SDAS_COMPLETE;
  constructor(public payload: ISdaListResult) { }
}
export class LoadSdasFailAction implements Action {
  public type = ActionTypes.LOAD_SDAS_FAIL;
  constructor(public payload: any) { }
}

export class ExportMrlPdfAction implements Action {
  public type = ActionTypes.EXPORT_MRL_PDF;
  constructor(public payload:  ISearchCriteria ) { }
}

export class  ExportMrlPdfCompleteAction implements Action {
  public type = ActionTypes.EXPORT_MRL_PDF_COMPLETE;
  constructor() { }
}

export class ExportMrlPdfFailAction implements Action {
  public type = ActionTypes.EXPORT_MRL_PDF_FAIL;
  constructor(public payload:  any ) { }
}


export class ExportMrlExcelAction implements Action {
  public type = ActionTypes.EXPORT_MRL_EXCEL;
  constructor(public payload:  ISearchCriteria ) { }
}

export class  ExportMrlExcelCompleteAction implements Action {
  public type = ActionTypes.EXPORT_MRL_EXCEL_COMPLETE;
  constructor() { }
}

export class ExportMrlExcelFailAction implements Action {
  public type = ActionTypes.EXPORT_MRL_EXCEL_FAIL;
  constructor(public payload:  any ) { }
}

export class LoadTwdListAction implements Action {
  public type = ActionTypes.LOAD_TWD_LIST;
  constructor(public payload:  any ) { }
}
export class LoadTwdListCompleteAction implements Action {
  public type = ActionTypes.LOAD_TWD_LIST_COMPLETE;
  constructor(public payload:  any ) { }
}

export class LoadTwdListFailAction implements Action {
  public type = ActionTypes.LOAD_TWD_LIST_FAIL;
  constructor(public payload:  any ) { }
}


export class ExportTwdExcelAction implements Action {
  public type = ActionTypes.EXPORT_TWD_EXCEL;
  constructor(public payload:  ISearchCriteria ) { }
}

export class  ExportTwdExcelCompleteAction implements Action {
  public type = ActionTypes.EXPORT_TWD_EXCEL_COMPLETE;
  constructor() { }
}

export class ExportTwdExcelFailAction implements Action {
  public type = ActionTypes.EXPORT_TWD_EXCEL_FAIL;
  constructor(public payload:  any ) { }
}



export class ExportTwdPdfAction implements Action {
  public type = ActionTypes.EXPORT_TWD_PDF;
  constructor(public payload:  ISearchCriteria ) { }
}

export class  ExportTwdPdfCompleteAction implements Action {
  public type = ActionTypes.EXPORT_TWD_PDF_COMPLETE;
  constructor() { }
}

export class ExportTwdPdfFailAction implements Action {
  public type = ActionTypes.EXPORT_TWD_PDF_FAIL;
  constructor(public payload:  any ) { }
}


export class ExportSdasAction implements Action {
  public type = ActionTypes.EXPORT_SDAS;
  constructor(public payload: any) { }
}

export class ExportSdasCompleteAction implements Action {
  public type = ActionTypes.EXPORT_SDAS_COMPLETE;
  public payload: any
  constructor() { }
}
export class ExportSdasFailAction implements Action {
  public type = ActionTypes.EXPORT_SDAS_FAIL;
  constructor(public payload: any) { }
}

export class LoadSdaAction implements Action {
  public type = ActionTypes.LOAD_SDA;
  constructor(public payload: ILoadSda) { }
}
export class LoadSdaCompleteAction implements Action {
  public type = ActionTypes.LOAD_SDA_COMPLETE;
  constructor(public payload: models.ISda) { }
}
export class LoadSdaFailAction implements Action {
  public type = ActionTypes.LOAD_SDA_FAIL;
  constructor(public payload: any) { }
}

export class LoadNewSdaAction implements Action {
  public type = ActionTypes.LOAD_NEW_SDA;
  public payload: any
  constructor() { }
}
export class SetSdaNewStatusAction implements Action {
  public type = ActionTypes.SET_SDA_NEW_STATUS;
  constructor(public payload: models.Status) { }
}

export class SaveSdaSearchCriteria implements Action {
  public type = ActionTypes.SAVE_SDA_SEARCH_CRITERIA;
  constructor(public payload: ISearchCriteria) { }
}

export class UploadAttachmentAction implements Action {
  public type = ActionTypes.UPLOAD_ATTACHMENT;
  constructor() { }
}

export class UploadAttachmentCompleteAction implements Action {
  public type = ActionTypes.UPLOAD_ATTACHMENT_COMPLETE;
  public payload: any;
  constructor() { }
}
export class UploadAttachmentFailAction implements Action {
  public type = ActionTypes.UPLOAD_ATTACHMENT_FAIL;
  constructor(public payload: any) { }
}

export class DownloadAttachmentAction implements Action {
  public type = ActionTypes.DOWNLOAD_ATTACHMENT;
  constructor(public payload: IDownloadAttachment) { }
}

export class DownloadAttachmentCompleteAction implements Action {
  public type = ActionTypes.DOWNLOAD_ATTACHMENT_COMPLETE;
  public payload: any;
  constructor() { }
}
export class DownloadAttachmentFailAction implements Action {
  public type = ActionTypes.DOWNLOAD_ATTACHMENT_FAIL;
  constructor(public payload: any) { }
}

export class ExportPDFAction implements Action {
  public type = ActionTypes.EXPORT_PDF;
  constructor(public payload: number[]) { }
}

export class ExportPDFCompleteAction implements Action {
  public type = ActionTypes.EXPORT_PDF_COMPLETE;
  public payload: any;
  constructor() { }
}
export class ExportPDFFailAction implements Action {
  public type = ActionTypes.EXPORT_PDF_FAIL;
  constructor(public payload: any) { }
}

export class SaveSearchTypeAction implements Action {
  public type = ActionTypes.SAVE_SEARCH_TYPE;
  constructor(public payload: SearchType) { }
}

export class ExportMrrPDFAction implements Action {
  public type = ActionTypes.EXPORT_MRR_PDF;
  constructor(public payload: { sdaIds: number[], pageData: models.ILazyLoadEvent }) { }
}

export class ExportMrrPDFCompleteAction implements Action {
  public type = ActionTypes.EXPORT_MRR_PDF_COMPLETE;
  public payload: any;
  constructor() { }
}
export class ExportMrrPDFFailAction implements Action {
  public type = ActionTypes.EXPORT_MRR_PDF_FAIL;
  constructor(public payload: any) { }
}


export type Actions =
  OperationFailedAction |
  LoadNoseNumbersAction |
  LoadNoseNumbersCompleteAction |
  LoadNoseNumbersFailAction |
  LoadAircraftInfoAction |
  LoadAircraftInfoCompleteAction |
  LoadAircraftInfoFailAction |
  SaveSdaAction |
  SaveSdaCompleteAction |
  SaveSdaFailAction |
  LoadSdasAction |
  SaveSdaSearchCriteria |
  LoadSdasCompleteAction |
  LoadSdasFailAction |
  ExportMrlPdfAction|
  ExportMrlPdfCompleteAction|
  ExportMrlPdfFailAction|
  ExportMrlExcelAction|
  ExportMrlExcelCompleteAction|
  ExportMrlExcelFailAction|
  ExportSdasAction |
  ExportSdasCompleteAction |
  ExportSdasFailAction |
  LoadSdaAction |
  LoadSdaCompleteAction |
  LoadSdaFailAction |
  LoadNewSdaAction |
  SetSdaNewStatusAction |
  LoadChangeLogAction |
  LoadChangeLogCompleteAction |
  LoadChangeLogFailAction |
  DownloadAttachmentAction |
  DownloadAttachmentCompleteAction |
  DownloadAttachmentFailAction |
  UploadAttachmentAction |
  UploadAttachmentCompleteAction |
  UploadAttachmentFailAction |
  ExportPDFAction |
  ExportPDFCompleteAction |
  ExportPDFFailAction |
  LoadTwdListAction |
  LoadTwdListCompleteAction|
  LoadTwdListFailAction|
  ExportTwdExcelAction |
  ExportTwdExcelCompleteAction|
  ExportTwdExcelFailAction|
  SaveSearchTypeAction|
  ExportMrrPDFAction|
  ExportMrrPDFCompleteAction|
  ExportMrrPDFFailAction
;
