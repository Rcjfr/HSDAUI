import { IGeneralSection } from './general-section.model';
import { IDefectLocationSection } from './defect-location-section.model';
import { ICPCPSection } from './cpcp-section.model';
import { ICPCPDispositionSection } from './cpcp-disposition-section.model';
import { ICorrectiveActionSection } from './corrective-action-section.model';
import { ISdaStatus } from './sda-status.model';

export interface ISda {
  id?: number;
  historicId?: string;
  workflowInstanceId?: string;
  versionID?: number;
  version?: number;
  lastModifiedBy?: string;
  lastModifiedOn?: Date;
  statusUpdatedBy?: string;
  statusUpdatedOn?: Date;
  comments?: string;
  status?: number;
  generalSection?: IGeneralSection;
  defectLocationSection?: IDefectLocationSection;
  cpcpSection?: ICPCPSection;
  correctiveActionSection?: ICorrectiveActionSection;
  cpcpDispositionSection?: ICPCPDispositionSection;
  history?: ISdaStatus[];
}
