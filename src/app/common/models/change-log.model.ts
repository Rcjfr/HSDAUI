export interface IChangeLog {
  sdaID?: number;
  sdaVersionId?: number
  version?: number
  status?: number;
  statusDesc: string
  statusUpdatedBy: string
  statusUpdatedOn: Date
  comments: string;
  attributeName: string;
  oldValue: string
  newValue: string
  }
