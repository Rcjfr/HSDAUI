import { IGeneralSection } from './general-section.model';
import { IDefectLocationSection } from './defect-location-section.model';
export interface ISda {
    id: number;
    historicId: string;
    workflowInstanceId: string;
    versionID: string;
    version: number;
    lastModifiedBy: string;
    lastModifiedOn: Date;
    statusUpdatedBy: string;
    statusUpdatedOn: Date;
    status: number;
    generalSection:any,
    defectLocationSection: any,
    cPCPSection: any,
    correctiveActionSection: any
    
}