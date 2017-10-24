import { IDTEAttachment } from './dte-attachment.model';
import { IDTEMonitorItem } from './dte-monitor-item.model';
import { IDTEThresholdItem } from './dte-threshold-item.model';
export interface IDTESection {
  versionID?: number;
  dteStatus?: number;
  totalShipTime?: string;
  cycles?: string;
  repairInspectionStatus?: number;
  isFatigueCritical?: boolean;
  stage1RTSDate?: Date;
  stage1Duration?: number;
  stage2Date?: Date;
  stage3Date?: Date;
  srNumber?: string;
  rdasNumber?: string;
  etdNumber?: string;
  esmSubItemNumber?: string;
  comments?: string;
  qcFeedback?: string;
  submittedToQC?: boolean;
  updatedBy?: string;
  updatedDate?: Date;
  dueDate?: string
  attachments?: IDTEAttachment[];
  thresholdItems?: IDTEThresholdItem[];
  monitorItems?: IDTEMonitorItem[];
}
