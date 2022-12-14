import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISda } from '@app/common/models';
export interface ISdaRecord extends TypedRecord<ISdaRecord>, ISda { }
export const SdaFactory = makeTypedFactory<ISda, ISdaRecord>({
  id: 0,
  historicId: '',
  workflowInstanceId: '00000000-0000-0000-0000-000000000000',
  source: 1,
  importDate: null,
  versionID: 0,
  version: 1,
  lastModifiedBy: '',
  lastModifiedOn: new Date(),
  statusUpdatedBy: '',
  statusUpdatedOn: new Date(),
  status: 0, //Open,
  comments: '',
  generalSection: {
    sdrNumber: null,
    station: null,
    department: null,
    aircraftNo: null,
    aircraftRegistrationNo: null,
    manufacturer: null,
    model: null,
    serialNo: null,
    totalShipTime: null,
    cycles: null,
    fleet: null,
    originator: null,
    lineMaintenance: false,
    alertCode: null,
    ataCode1: null,
    ataCode2: null,
    defectDiscoveredDuring: null,
    unscheduledMaintenanceDescription: null,
    checkType: null,
    checkTypeOtherText: null,
    routineNo: null,
    nonRoutineNo: null,
    esmReference: null,
    micNo: null,
    createDate: new Date((new Date()).setHours(0, 0, 0, 0)),
  },
  defectLocationSection: {
    damageType: null,
    damageDescription: null,
    length: null,
    width: null,
    depth: null,
    aircraftStation: null,
    stringer: null,
    waterLine: null,
    buttLine: null,
    manufacturerPartNo: null,
    partDefective: null,
    manufacturerSerialNo: null,
    partTT: null,
    partTSO: null,
    detectionMethod: null,
    detectionMethodOtherDescription: null
  },
  cpcpSection: {
    isCPCPRelatedEvent: null,
    isWideSpreadCorrosion: null,
    corrosionLevel: null,
    isPreviouslyBlended: null,
    corrosionType: null,
    corrosionTypeOtherText: null,
    corrosionTaskNo: null,
    causesOfDamage: null,
    causeOfDamageOtherText: null,
    floorBoardCondition: null
  },
  correctiveActionSection: {
    isDeferred: null,
    deferralCode: null,
    deferralNo: null,
    repairType: null,
    defectivePartDescription: null,
    modifiedPartDescription: null,
    repairDescriptionType: null,
    repairDescriptionOtherText: null,
    repairDocumentType: null,
    chapFigRepairText: null,
    engineeringAuthorization: null,
    isExternallyVisible: null,
    repairHeight: null,
    repairWidth: null,
    isMajorRepair: null,
    majorRepairDescription: null
  },
  cpcpDispositionSection: {

  },
  dteSection: {},
  history: []
});
