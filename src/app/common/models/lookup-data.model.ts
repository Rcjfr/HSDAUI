import { IBaseLookUp } from './base-lookup.model';
import { ICheckType } from './check-type.model';
import { IATACode } from './ata-code.model';

export interface ILookupData {
  alertCodes: IBaseLookUp[];
  causeOfDamages: IBaseLookUp[];
  corrosionLevels: IBaseLookUp[];
  corrosionTypes: IBaseLookUp[];
  damageTypes: IBaseLookUp[];
  departments: IBaseLookUp[];
  detectionMethods: IBaseLookUp[];
  dteStatus: IBaseLookUp[];
  dteInspectionTimeSpan: IBaseLookUp[];
  floorBoardConditions: IBaseLookUp[];
  corrosionLevelChangeReasons: IBaseLookUp[];
  repairDescriptionTypes: IBaseLookUp[];
  repairDocumentTypes: IBaseLookUp[];
  repairInspectionStatus: IBaseLookUp[];
  ataCodes: IATACode[];
  checkTypes: ICheckType[];
  sdaStatus: IBaseLookUp[];
  dteRepairStatus: IBaseLookUp[];
  dteComponentType: IBaseLookUp[];
  fleet: IBaseLookUp[];
}

