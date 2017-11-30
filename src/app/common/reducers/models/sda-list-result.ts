import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISdaListView, ISdaListResult } from '@app/common/models';

export interface ISdaListResultRecord extends TypedRecord<ISdaListResultRecord>, ISdaListResult { }
export const SdaListResultFactory = makeTypedFactory<ISdaListResult, ISdaListResultRecord>({
  records: undefined,
  totalRecords: undefined
});

