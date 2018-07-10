import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {ILookupData} from '@app/common/models';

export interface LookupDataRecord extends TypedRecord<LookupDataRecord>, ILookupData { }

export const LookupDataFactory = makeTypedFactory<ILookupData, LookupDataRecord>(
  {
alertCodes: [],
  causeOfDamages: [],
  corrosionLevels: [],
  corrosionTypes: [],
  damageTypes: [],
  departments: [],
  detectionMethods: [],
  dteStatus: [],
  floorBoardConditions: [],
  corrosionLevelChangeReasons: [],
  repairDescriptionTypes: [],
  repairDocumentTypes: [],
  repairInspectionStatus: [],
  ataCodes: [],
  checkTypes: [],
  sdaStatus: [],
  dteRepairStatus: [],
  dteComponentType: []

});
