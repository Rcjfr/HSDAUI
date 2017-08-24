import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISdaSearchCriteria } from 'app/common/models';
import { List } from 'immutable';

export interface SdaSearchCriteriaRecord extends TypedRecord<SdaSearchCriteriaRecord>, ISdaSearchCriteria { }

export const searchCriteriaFactory = makeTypedFactory<ISdaSearchCriteria, SdaSearchCriteriaRecord>({
    PageData: undefined,
    SearchByDateRange: undefined,
    SearchBySDA: undefined
});