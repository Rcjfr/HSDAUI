import { IGeneralSection } from './general-section.model';
import { IDefectLocationSection } from './defect-location-section.model';
import { ICPCPSection } from './cpcp-section.model';
import { ICorrectiveActionSection } from './corrective-action-section.model';
export interface ISda {
  id?: number;
  historicId: string;
  workflowInstanceId: string;
  versionID: string;
  version: number;
  lastModifiedBy: string;
  lastModifiedOn: Date;
  statusUpdatedBy: string;
  statusUpdatedOn: Date;
  status: number;
  generalSection: IGeneralSection;
  defectLocationSection: IDefectLocationSection;
  cpcpSection: ICPCPSection;
  correctiveActionSection: ICorrectiveActionSection;
}