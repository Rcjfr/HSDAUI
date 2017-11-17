import { ISdaListView } from '@app/common/models';
import { Record, List } from 'immutable';

export type SdaListResultProps = {
  totalRecords: number;
  records: ISdaListView[]
};

const defaultProps = {
  totalRecords: undefined,
  records: undefined
};

export class SdaListResult extends Record(defaultProps) {
  totalRecords: number;
  records: ISdaListView[]

  constructor(props: SdaListResultProps = defaultProps) {
    super(props);
  }
};
