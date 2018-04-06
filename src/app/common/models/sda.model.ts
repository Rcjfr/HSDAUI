import { IGeneralSection } from './general-section.model';
import { IDefectLocationSection } from './defect-location-section.model';
import { ICPCPSection } from './cpcp-section.model';
import { ICPCPDispositionSection } from './cpcp-disposition-section.model';
import { ICorrectiveActionSection } from './corrective-action-section.model';
import { ISdaStatus } from './sda-status.model';
import { IDTESection } from './dte-section.model';

export interface ISda {
  id?: number;
  historicId?: string;
  workflowInstanceId?: string;
  source?: number;
  versionID?: number;
  version?: number;
  lastModifiedBy?: string;
  lastModifiedOn?: Date;
  statusUpdatedBy?: string;
  statusUpdatedOn?: Date;
  comments?: string;
  status?: number;
  hasSDRRequested?: boolean;
  generalSection?: IGeneralSection;
  defectLocationSection?: IDefectLocationSection;
  cpcpSection?: ICPCPSection;
  correctiveActionSection?: ICorrectiveActionSection;
  cpcpDispositionSection?: ICPCPDispositionSection;
  dteSection?: IDTESection;
  history?: ISdaStatus[];
}
