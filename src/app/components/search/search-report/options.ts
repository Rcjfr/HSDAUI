export interface IReportOption {
  key: string;
  display: string;
  format?: string;
}

export const ReportOptions: IReportOption[] = [
  //General Information
  { key: 'ID', display: 'SDA ID' },
  { key: 'HistoricId', display: 'Historic SDA ID' },
  { key: 'StatusUpdatedBy', display: 'Last Updated By' },
  { key: 'StatusUpdatedOn', display: 'Last Updated On', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'Status', display: 'Current Status' },
  { key: 'SdrNumber', display: 'SDR Number' },
  { key: 'Station', display: 'Station' },

  { key: 'Department', display: 'Department' },
  { key: 'AircraftNo', display: 'Nose Number' },
  { key: 'Manufacturer', display: 'Manufacturer' },
  { key: 'Model', display: 'Model' },
  { key: 'SerialNo', display: 'Serial #' },
  { key: 'TotalShipTime', display: 'Total Ship Time' },
  { key: 'Cycles', display: 'Cycles' },
  { key: 'Fleet', display: 'Fleet' },
  { key: 'Originator', display: 'Originator' },
  { key: 'LineMaintenance', display: 'Line Maintenance?' },
  { key: 'AlertCode', display: 'Alert Code' },
  { key: 'AtaCode1', display: 'ATA Code 1' },
  { key: 'AtaCode2', display: 'ATA Code 2' },
  { key: 'DefectDiscoveredDuring', display: 'Defect Discovered During' },
  { key: 'UnscheduledMaintenanceDescription', display: 'Unscheduled Maintenance Description' },
  { key: 'CheckType', display: 'Check Type' },
  { key: 'RoutineNo', display: 'Routine #' },
  { key: 'NonRoutineNo', display: 'Non-Routine #' },
  { key: 'ESMReference', display: 'ESM Reference #' },
  { key: 'MicNo', display: 'MIC #' },
  { key: 'CreateDate', display: 'Create Date', format: 'M/d/yyyy' },


  //Description and Location of Defects or Damage
  { key: 'DamageType', display: 'Damage Type' },
  { key: 'DamageDescription', display: 'Damage Description' },
  { key: 'Length', display: 'Defect Length' },
  { key: 'Width', display: 'Defect Width' },
  { key: 'Depth', display: 'Defect Depth' },
  { key: 'AircraftStation', display: 'Aircraft Station' },
  { key: 'Stringer', display: 'Stringer' },
  { key: 'WaterLine', display: 'Water Line' },
  { key: 'ButtLine', display: 'Butt Line' },
  { key: 'ManufacturerPartNo', display: 'MFG Part #' },
  { key: 'PartDefective', display: 'Part Defective' },
  { key: 'ManufacturerSerialNo', display: 'MFG Serial #' },
  { key: 'PartTT', display: 'Part TT' },
  { key: 'PartTSO', display: 'Part TSO' },
  { key: 'DetectionMethod', display: 'How Detected' },

  //Corrosion Prevention Control Program
  { key: 'IsCPCPRelatedEvent', display: 'Is CPCP related event?' },
  { key: 'IsWideSpreadCorrosion', display: 'Widespread Corrosion' },
  { key: 'CorrosionLevel', display: 'Corrosion Level' },
  { key: 'IsPreviouslyBlended', display: 'Corroded Area Previously Blended' },
  { key: 'CorrosionType', display: 'Type of Corrosion' },
  { key: 'CorrosionTypeOtherText', display: 'Type of Corrosion(Other)' },
  { key: 'CorrosionTaskNo', display: 'Corrosion Task #' },

  { key: 'CausesOfDamage', display: 'Cause of Damage' },
  { key: 'CauseOfDamageOtherText', display: 'Cause of Damage(Other) Description' },
  { key: 'FloorBoardCondition', display: 'Floorboard condition after mat is removed' },

  //Corrective Action
  { key: 'IsDeferred', display: 'Deferred' },
  { key: 'DeferralCode', display: 'SCEPTRE Deferral Code' },
  { key: 'DeferralNo', display: 'Deferral #' },
  { key: 'RepairType', display: 'Corrective Action Repair Type' },
  { key: 'DefectivePartDescription', display: 'Defective Part Description' },
  { key: 'ModifiedPartDescription', display: 'Modified Part Description' },
  { key: 'RepairDescriptionType', display: 'Repaired Description Type' },
  { key: 'RepairDocumentType', display: 'Repair Document' },
  { key: 'ChapFigRepairText', display: 'Chap/Fig/Repair' },
  { key: 'EngineeringAuthorization', display: 'Engineering Authorization (EA)' },
  { key: 'IsExternallyVisible', display: 'Externally Visible?' },
  { key: 'RepairHeight', display: 'Repair Height (inches)' },
  { key: 'RepairWidth', display: 'Repair Width (inches)' },
  { key: 'IsMajorRepair', display: 'Major Repair' },
  { key: 'MajorRepairDescription', display: 'Major Repair Description' },

  //CPCP Disposition
  { key: 'IsNonCPCPRelatedEvent', display: 'Non-CPCP?' },
  { key: 'IsCPCPDWideSpreadCorrosion', display: 'CPCP Disposition - Widespread Corrosion?' },
  { key: 'IsCorrosionLevelCorrect', display: 'Is Corrosion Level correct?' },
  { key: 'CorrectedCorrosionLevel', display: 'Corrected Corrosion Level' },
  { key: 'IsCorrosionTaskNoCorrect', display: 'Is CPCP Task # correct?' },
  { key: 'CorrectedCorrosionTaskNo', display: 'Corrected CPCP Task #' },
  { key: 'CorrosionLevelChangeReason', display: 'Reason for level change' },
  { key: 'CorrosionLevelChangeReasonOtherText', display: 'Reason for level change(Other) - Description' },
  { key: 'EngineeringComments', display: 'Engineering Comments' },
  { key: 'QCFeedback', display: 'QC Feedback(CPCP Disposition)' },
  { key: 'isReviewComplete', display: 'Review Complete(CPCP Disposition)?' },
  { key: 'reviewer', display: 'Reviewer(CPCP Disposition)' },
  { key: 'submittedToQC', display: 'Submitted to QC(CPCP Disposition)?' },

  //DTE
  { key: 'DTEStatus', display: 'DTE Status' },
  { key: 'DTETotalShipTime', display: 'Total Ship Time(DTE)' },
  { key: 'DTECycles', display: 'Cycles(DTE)' },
  { key: 'RepairInspectionStatus', display: 'Repair Insp. Status' },
  { key: 'IsFatigueCritical', display: 'Fatigue Critical?' },
  { key: 'Stage1RTSDate', display: 'Stage 1/RTS Date' },
  { key: 'Stage1Duration', display: 'Stage 1 Interval', format: 'M/d/yyyy' },
  { key: 'Stage2Date', display: 'Stage 2 Approval Date', format: 'M/d/yyyy' },
  { key: 'Stage3Date', display: 'Stage 3 Approval Date', format: 'M/d/yyyy' },
  { key: 'SRNumber', display: 'SR #' },
  { key: 'RDASNumber', display: 'RDAS #' },
  { key: 'ETDNumber', display: 'ETD #' },
  { key: 'ESMSubItemNumber', display: 'ESM Sub/Item #' },
  { key: 'DTEComments', display: 'Comments(DTE)' },
  { key: 'DTEUpdatedBy', display: 'Updated By(DTE)' },
  { key: 'DTEUpdatedDate', display: 'Updated Date(DTE)', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'DueDate', display: 'Due Date(DTE)' },
  { key: 'DTEQCFeedback', display: 'QC Feedback(DTE)' },
  { key: 'DTESubmittedToQC', display: 'Submitted to QC(DTE)?' },
  { key: 'DTEInspectionThreshold1', display: 'Inspection Threshold(1)' },
  { key: 'DTEInspectionThreshold2', display: 'Inspection Threshold(2)' },
  { key: 'DTEInspectionThreshold3', display: 'Inspection Threshold(3)' },
  { key: 'DTEInspectionThreshold4', display: 'Inspection Threshold(4)' },
  { key: 'DTEInspectionThreshold5', display: 'Inspection Threshold(5)' },

  { key: 'DTEInspectionInterval1', display: 'Inspection Interval(1)' },
  { key: 'DTEInspectionInterval2', display: 'Inspection Interval(2)' },
  { key: 'DTEInspectionInterval3', display: 'Inspection Interval(3)' },
  { key: 'DTEInspectionInterval4', display: 'Inspection Interval(4)' },
  { key: 'DTEInspectionInterval5', display: 'Inspection Interval(5)' },
  { key: 'DTEInspectionMethod1', display: 'Inspection Method(1)' },
  { key: 'DTEInspectionMethod2', display: 'Inspection Method(2)' },
  { key: 'DTEInspectionMethod3', display: 'Inspection Method(3)' },
  { key: 'DTEInspectionMethod4', display: 'Inspection Method(4)' },
  { key: 'DTEInspectionMethod5', display: 'Inspection Method(5)' },
  { key: 'DTEMonitorItem1', display: 'FMR/Logpage/MON(1)' },
  { key: 'DTEMonitorItem2', display: 'FMR/Logpage/MON(2)' },
  { key: 'DTEMonitorItem3', display: 'FMR/Logpage/MON(3)' },
  { key: 'DTEMonitorItem4', display: 'FMR/Logpage/MON(4)' },
  { key: 'DTEMonitorItem5', display: 'FMR/Logpage/MON(5)' }
];
