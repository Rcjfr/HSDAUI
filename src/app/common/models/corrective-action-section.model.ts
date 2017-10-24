export interface ICorrectiveActionSection {
  versionID?: number;
  isDeferred?: boolean;
  deferralCode?: string;
  deferralNo?: string;
  repairType?: number;
  defectivePartDescription?: string;
  modifiedPartDescription?: string;
  repairDescriptionType?: number;
  repairDocumentType?: number;
  chapFigRepairText?: string;
  engineeringAuthorization?: string;
  isExternallyVisible?: boolean;
  repairHeight?: number;
  repairWidth?: number;
  isMajorRepair?: boolean;
  majorRepairDescription?: string;
  completedBy?: string;
  completedDate?: Date;
}
