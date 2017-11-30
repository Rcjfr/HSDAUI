import { ISdaListView } from '@app/common/models';
import { Record, List } from 'immutable';

export interface ISdaListResult {
  totalRecords: number;
  records: ISdaListView[];
};
