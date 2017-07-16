import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISda } from '../../models';
export interface SdaRecord extends TypedRecord<SdaRecord>, ISda {  }
export const sdaFactory = makeTypedFactory<ISda, SdaRecord>({
  id: 0,
  historicId: '',
  workflowInstanceId: '',
  versionID: '',
  version: 1,
  lastModifiedBy: 'BADGEID',
  lastModifiedOn: new Date(),
  statusUpdatedBy: 'BADGEID',
  statusUpdatedOn: new Date(),
  status: 1, //Open,
  generalSection: null,
  defectLocationSection: null,
  cPCPSection: null,
  correctiveActionSection:null
  
});