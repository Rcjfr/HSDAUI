import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';
import { ISdaListResult } from '@app/common/models';
import { ISearchCriteria } from '@app/common/models/search/search-criteria.model';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';
import { IDownloadAttachment } from '@app/common/models/payload/download-attachment.model';

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

  DOWNLOAD_ATTACHMENT: 'Download SDA Attachment',
  DOWNLOAD_ATTACHMENT_COMPLETE: 'Download SDA Attachment complete',
  DOWNLOAD_ATTACHMENT_FAIL: 'Download SDA Attachment fail',

  EXPORT_PDF: 'Export PDF',
  EXPORT_PDF_COMPLETE: 'Export PDF Complete',
  EXPORT_PDF_FAIL: 'Export PDF Fail',

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
  constructor(public payload: string) { }
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
  ExportPDFAction |
  ExportPDFCompleteAction |
  ExportPDFFailAction
  ;
