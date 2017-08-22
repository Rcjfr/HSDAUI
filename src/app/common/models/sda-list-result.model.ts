import { ISdaListView } from 'app/common/models';
import { List } from 'immutable';

export interface ISdaListResult {
  totalRecords: number;
  records: List<ISdaListResult>
}