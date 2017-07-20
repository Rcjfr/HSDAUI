﻿import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISda } from '../../models';
export interface SdaRecord extends TypedRecord<SdaRecord>, ISda { }
export const sdaFactory = makeTypedFactory<ISda, SdaRecord>({
  id:null,
  historicId: '',
  workflowInstanceId: '',
  versionID: '',
  version: 1,
  lastModifiedBy: 'BADGEID',
  lastModifiedOn: new Date(),
  statusUpdatedBy: 'BADGEID',
  statusUpdatedOn: new Date(),
  status: 1, //Open,
  generalSection: {
    sdrNumber: null,
    station: null,
    department: null,
    aircraftNo: null,
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
    routineNo: null,
    nonRoutineNo: null,
    micNo: null,
    createDate: null,
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
    detectionMethod: null
  },
  cpcpSection: {
    iscpcpRelatedEvent: null,
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
    repairDocumentType: null,
    chapFigRepairText: null,
    engineeringAuthorization: null,
    isExternallyVisible: null,
    repairHeight: null,
    repairWidth: null,
    isMajorRepair: null,
    majorRepairDescription: null,
    completedBy: null,
    completedDate: null
  }
});