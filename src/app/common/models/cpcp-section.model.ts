export interface ICPCPSection {
  id?: number;
  isCPCPRelatedEvent?: boolean;
  isWideSpreadCorrosion?: boolean;
  corrosionLevel?: number;
  isPreviouslyBlended?: boolean;
  corrosionType?: number;
  corrosionTypeOtherText?: string;
  corrosionTaskNo?: string;
  causesOfDamage?: number;
  causeOfDamageOtherText?: string;
  floorBoardCondition?: number;
}
