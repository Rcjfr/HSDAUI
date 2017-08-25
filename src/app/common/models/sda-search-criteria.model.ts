import { Record } from 'immutable';

type SdaSearchCriteriaProps = {
  pageData: any;
  searchByDateRange: any;
  searchBySDA: SearchBySda;
};

const defaultProps = {
  pageData: undefined,
  searchByDateRange: undefined,
  searchBySDA: undefined
};

export class SdaSearchCriteria extends Record(defaultProps) {
  pageData: any;
  searchByDateRange: any;
  searchBySDA: SearchBySda;

  constructor(props: SdaSearchCriteriaProps = defaultProps) {
    super(props);
  }
};

//searchBySda
type SearchBySdaProps = {
  id: any;
  station: any;
  alertCode: any;
  sdrNumber: any;
  department: any;
  ataCode1: any;
  originator: any;
  ataCode2: any;
  fleet: any;
  checkType: any;
};

const defaultProps2 = {
  id: undefined,
  station: undefined,
  alertCode: undefined,
  sdrNumber: undefined,
  department: undefined,
  ataCode1: undefined,
  originator: undefined,
  ataCode2: undefined,
  fleet: undefined,
  checkType: undefined
};

export class SearchBySda extends Record(defaultProps) {
  pageData: any;
  searchByDateRange: any;
  searchBySDA: any;

  constructor(props: SearchBySdaProps = defaultProps2) {
    super(props);
  }
};
