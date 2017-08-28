import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISdaListResult } from 'app/common/models';
import { List } from 'immutable';

export interface SdaListResultRecord extends TypedRecord<SdaListResultRecord>, ISdaListResult { }

export const sdaListResultFactory = makeTypedFactory<ISdaListResult, SdaListResultRecord>({
    totalRecords: 0,
    records: List<ISdaListResult>()
});