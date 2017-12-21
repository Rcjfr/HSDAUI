export interface IDefectLocationSection {
  versionID?: number;
  damageType?: number;
  damageDescription?: string;
  length?: number;
  width?: number;
  depth?: number;
  aircraftStation?: string;
  stringer?: string;
  waterLine?: string;
  buttLine?: string;
  manufacturerPartNo?: string;
  partDefective?: string;
  manufacturerSerialNo?: string;
  partTT?: number;
  partTSO?: number;
  detectionMethod?: number;
  detectionMethodOtherDescription?: string;
}
