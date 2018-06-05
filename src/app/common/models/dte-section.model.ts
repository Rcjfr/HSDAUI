import { IDTEAttachment } from './dte-attachment.model';
import { IDTEMonitorItem } from './dte-monitor-item.model';
import { IDTEThresholdItem } from './dte-threshold-item.model';
export interface IDTESection {
  versionID?: number;
  dteStatus?: number;
  totalShipTime?: number;
  cycles?: number;
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
  submitToQC?: boolean;
  updatedByBadgeNo?: string;
  updatedBy?: string;
  updatedDate?: Date;
  dueDate?: string
  attachments?: IDTEAttachment[];
  thresholdItems?: IDTEThresholdItem[];
  monitorItems?: IDTEMonitorItem[];
  taskCardNo?: string;
  repairDate?: Date;
  airlineCode?: string;
  cmbNumber?: string;
  compForAircraft?: string;
  removedByDate?: Date;
  mrbNumber?: string;
  mrtNumber?: string;
  removedByMrt?: string;
  status?: number;
  zone?: string;
  repairLocation?: string;
  mroDocuments?: string;
  legacyEA?: string;
  componentType?: number;
  controlOrderNumber?: string,
  componentAAID?: string,
  componentSerialNumber?: string,
  componentRspam?: string,
  componentMpn?: string,
  componentHours?: string,
  componentCycles?: string
  onOffWing?: string;
  rack?: string;
  engPsn?: string;
  engCycles?: string;
  engHours?: string;
  engRspam?: string;
  engSn?: string;
  engMpn?: string;
}
