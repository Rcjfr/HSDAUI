import { ISdaListView } from 'app/common/models';

export interface ISdaListResult {
  totalRecords: number;
  records: ISdaListView[];
}