import { Record } from 'immutable';

type SdaSearchCriteriaProps = {
  pageData: any;
  searchByDateRange: SearchByDateRangeProps;
  searchBySDA: SearchBySda;
  searchByAircraft: SearchByAircraft;
  searchByCorrosion: SearchByCorrosion;
  searchByCorrectiveAction: SearchByCorrectiveAction;
};

const defaultProps = {
  pageData: undefined,
  searchByDateRange: undefined,
  searchBySDA: undefined,
  searchByAircraft: undefined,
  searchByCorrosion: undefined,
  searchByCorrectiveAction: undefined
};

export class SdaSearchCriteria extends Record(defaultProps) {
  pageData: any;
  searchByDateRange: SearchByDateRangeProps;
  searchBySDA: SearchBySda;
  searchByAircraft: SearchByAircraft;
  searchByCorrosion: SearchByCorrosion;
  searchByCorrectiveAction: SearchByCorrectiveAction;

  constructor(props: SdaSearchCriteriaProps = defaultProps) {
    super(props);
  }
};

//searchByDateRange
type SearchByDateRangeProps = {
  dateFrom: any;
  dateThrough: any;
};

const dateRangeDefaultProps = {
  dateFrom: undefined,
  dateThrough: undefined
};

export class SearchByDateRange extends Record(dateRangeDefaultProps) {
  dateFrom: any;
  dateThrough: any;

  constructor(props: SearchByDateRangeProps = dateRangeDefaultProps) {
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

const sdaDefaultProps = {
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

export class SearchBySda extends Record(sdaDefaultProps) {
  pageData: any;
  searchByDateRange: any;
  searchBySDA: any;

  constructor(props: SearchBySdaProps = sdaDefaultProps) {
    super(props);
  }
};


//searchByAircraft
type searchByAircraftProps = {
  aircraftNo: any;
  manufacturer: any;
  model: any;
  serialNo: any;
};

const aircraftDefaultProps = {
  aircraftNo: undefined,
  manufacturer: undefined,
  model: undefined,
  serialNo: undefined
};

export class SearchByAircraft extends Record(aircraftDefaultProps) {
  aircraftNo: any;
  manufacturer: any;
  model: any;
  serialNo: any;

  constructor(props: searchByAircraftProps = aircraftDefaultProps) {
    super(props);
  }
};

//searchByCorrosion
type searchByCorrosionProps = {
    isWideSpreadCorrosion: any;
    isPreviouslyBlended: any;
    corrosionTaskNo: any;
    corrosionLevel: any;
    corrosionType: any;
    causesOfDamage: any;
   
};

const corrosionDefaultProps = {
    isWideSpreadCorrosion: undefined,
    isPreviouslyBlended: undefined,
    corrosionTaskNo: undefined,
    corrosionLevel: undefined,
    corrosionType: undefined,
    causesOfDamage: undefined
};

export class SearchByCorrosion extends Record(corrosionDefaultProps) {
    isWideSpreadCorrosion: any;
    isPreviouslyBlended: any;
    corrosionTaskNo: any;
    corrosionLevel: any;
    corrosionType: any;
    causesOfDamage: any;

    constructor(props: searchByCorrosionProps = corrosionDefaultProps) {
        super(props);
    }
};
//searchByCorrectiveAction
type searchByCorrectiveActionProps = {
    IsDeferred: any;
    IsMajorRepair: any;
    DeferralCode: any;
    DefectivePartDescription: any;
    ModifiedPartDescription: any;
    RepairDescriptionType: any;
    MajorRepairDescription: any;
    CompletedBy: any;
    RepairDocumentType: any;
    IsExternallyVisible: any;
    RepairHeight: any;
    RepairWidth: any;
    ChapFigRepairText: any;
    DeferralNo: any;
    RepairType: any;
};

const CorrectiveActionDefaultProps = {
    IsDeferred: undefined,
    IsMajorRepair: undefined,
    DeferralCode: undefined,
    DefectivePartDescription: undefined,
    ModifiedPartDescription: undefined,
    RepairDescriptionType: undefined,
    MajorRepairDescription: undefined,
    CompletedBy: undefined,
    RepairDocumentType: undefined,
    IsExternallyVisible: undefined,
    RepairHeight: undefined,
    RepairWidth: undefined,
    ChapFigRepairText: undefined,
    DeferralNo: undefined,
    RepairType: undefined
};

export class SearchByCorrectiveAction extends Record(CorrectiveActionDefaultProps) {
    IsDeferred: any;
    IsMajorRepair: any;
    DeferralCode: any;
    DefectivePartDescription: any;
    ModifiedPartDescription: any;
    RepairDescriptionType: any;
    MajorRepairDescription: any;
    CompletedBy: any;
    RepairDocumentType: any;
    IsExternallyVisible: any;
    RepairHeight: any;
    RepairWidth: any;
    ChapFigRepairText: any;
    DeferralNo: any;
    RepairType: any;

    constructor(props: searchByCorrectiveActionProps = CorrectiveActionDefaultProps) {
        super(props);
    }
};

