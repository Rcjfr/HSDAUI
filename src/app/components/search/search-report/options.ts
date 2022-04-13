export interface IReportOption {
  key: string;
  display: string;
  dbField?: string;
  format?: string;
}

export const ReportOptions: IReportOption[] = [
  //General Information
  { key: 'ID', display: 'SDA ID', dbField: 'ID'},
  { key: 'HistoricId', display: 'Historic SDA ID', dbField: 'HISTORIC_ID'},
  { key: 'StatusUpdatedBy', display: 'Last Updated By', dbField: 'STATUS_UPDATED_BY'},
  { key: 'StatusUpdatedOn', display: 'Last Updated On', dbField: 'STATUS_UPDATED_ON', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'Status', display: 'Current Status', dbField: 'STATUS_DESC' },
  { key: 'SdrNumber', display: 'SDR Number', dbField: 'SDR_NMBR' },
  { key: 'Station', display: 'Station', dbField: 'AIRLN_BUSISTN_CD' },
  { key: 'Department', display: 'Department', dbField: 'MNTNC_DEPT_DESC' },
  { key: 'AircraftNo', display: 'Nose Number', dbField: 'AIRCRFT_NBR' },
  { key: 'AircraftRegistrationNo', display: 'Registartion Number', dbField: 'AIRCRFT_REG_NBR' },
  { key: 'Manufacturer', display: 'Manufacturer', dbField: 'AIRCRFT_MFCTR' },
  { key: 'Model', display: 'Model', dbField: 'AIRCRFT_MDL_SRS' },
  { key: 'SerialNo', display: 'Serial #', dbField: 'AIRCRFT_SRL_NBR' },
  { key: 'TotalShipTime', display: 'Total Ship Time', dbField: 'AIRCFT_TTL_TM_QTY' },
  { key: 'Cycles', display: 'Cycles', dbField: 'AIRCFT_TTL_CYCLE_QTY' },
  { key: 'Fleet', display: 'Fleet', dbField: 'AIRCRFT_FLT_TYPE_DESC' },
  { key: 'Originator', display: 'Originator', dbField: 'ORIGINATOR'},
  { key: 'LineMaintenance', display: 'Line Maintenance?', dbField: 'LINE_MNTNC_IND' },
  { key: 'AlertCode', display: 'Alert Code', dbField: 'ALERT_DESC' },
  { key: 'AtaCode1Desc', display: 'ATA Code 1', dbField: 'ATA_CHAPTR_DESC' },
  { key: 'AtaCode2Desc', display: 'ATA Code 2', dbField: 'ATA_DESC_TXT' },
  { key: 'DefectDiscoveredDuring', display: 'Defect Discovered During', dbField: 'DEFCT_DSCVR_IND' },
  { key: 'UnscheduledMaintenanceDescription', display: 'Unscheduled Maintenance Description', dbField: 'UNSCHDLD_MNTNC_DESC' },
  { key: 'CheckTypeDesc', display: 'Check Type', dbField: 'CHECK_TYPE_DESC' },
  { key: 'CheckTypeOtherText', display: 'Other Check Type', dbField: 'MNTNC_CHK_TYPE_OTHER_DESC' },
  { key: 'RoutineNo', display: 'Routine #', dbField: 'SCHD_MNTNC_RTN_TASK_CARD_TXT'},
  { key: 'NonRoutineNo', display: 'Non-Routine #', dbField: 'SCHD_MNTNC_NONRTN_TASKCARD_TXT' },
  { key: 'ESMReference', display: 'ESM Reference #', dbField: 'SCHD_MNTNC_ESM_REFERENCE_TXT' },
  { key: 'MicNo', display: 'MIC #', dbField: 'MTNC_INCDNT_CHK_TXT' },
  { key: 'CreateDate', display: 'Create Date', format: 'M/d/yyyy', dbField: 'CREATEDATE' },
  //Description and Location of Defects or Damage
  { key: 'DamageTypeDesc', display: 'Damage Type', dbField: 'STRUCT_DAMAGE_DESC' },
  { key: 'DamageDescription', display: 'Damage Description', dbField: 'STRUCT_DEFCT_DESC' },
  { key: 'Length', display: 'Defect Length', dbField: 'DEFCT_LENGTH_QTY'},
  { key: 'Width', display: 'Defect Width', dbField: 'DEFCT_WIDTH_QTY' },
  { key: 'Depth', display: 'Defect Depth', dbField: 'DEFCT_DEPTH_QTY' },
  { key: 'AircraftStation', display: 'Aircraft Station', dbField: 'DEFCT_AIRCFT_STN_VAL_TXT' },
  { key: 'Stringer', display: 'Stringer', dbField: 'DEFCT_STRINGER_VAL_TXT' },
  { key: 'WaterLine', display: 'Water Line', dbField: 'DEFCT_WATERLINE_VAL_TXT' },
  { key: 'ButtLine', display: 'Butt Line', dbField: 'DEFCT_BUTTLINE_VAL_TXT' },
  { key: 'ManufacturerPartNo', display: 'MFG Part #', dbField: 'DEFCT_MFCTR_PART_TXT' },
  { key: 'PartDefective', display: 'Part Defective', dbField: 'DEFCT_PART_DEFCT_TXT' },
  { key: 'ManufacturerSerialNo', display: 'MFG Serial #', dbField: 'DEFCT_MFCTR_SERIAL_TXT' },
  { key: 'PartTT', display: 'Part TT', dbField: 'DEFCT_PART_TTL_TM_QTY' },
  { key: 'PartTSO', display: 'Part TSO', dbField: 'DEFCT_PART_TTL_SNCE_OVRHAL_QTY' },
  { key: 'DetectionMethodDesc', display: 'How Detected', dbField: 'DEFECT_DETECTED_DESC' },
  { key: 'DetectionMethodOtherDescription', display: 'How Detected(Other)', dbField: 'DEFECT_DETECTED_OTHER_TEXT' },
  //Corrosion Prevention Control Program
  { key: 'IsCPCPRelatedEvent', display: 'Is CPCP related event?', dbField: 'IS_CPCP_RELATED' },
  { key: 'IsWideSpreadCorrosion', display: 'Widespread Corrosion', dbField: 'IS_WIDESPREAD_CORROSION' },
  { key: 'CorrosionLevelDesc', display: 'Corrosion Level', dbField: 'CORROSION_LEVEL_DESC' },
  { key: 'IsPreviouslyBlended', display: 'Corroded Area Previously Blended', dbField: 'CORRODED_AREA_PREVIOUSLY_BLENDED' },
  { key: 'CorrosionTypeDesc', display: 'Type of Corrosion', dbField: 'CORROSION_TYPE_DESC' },
  { key: 'CorrosionTypeOtherText', display: 'Type of Corrosion(Other)', dbField: 'CORROSION_TYPE_OTHER_DESCRIPTION' },
  { key: 'CorrosionTaskNo', display: 'Corrosion Task #', dbField: 'CORROSION_TASK_NO' },
  { key: 'CausesOfDamageDesc', display: 'Cause of Damage', dbField: 'CAUSE_OF_DAMAGE_DESC' },
  { key: 'CauseOfDamageOtherText', display: 'Cause of Damage(Other) Description', dbField: 'CAUSE_OF_DAMAGE_OTHER_DESCRIPTION' },
  { key: 'FloorBoardConditionDesc', display: 'Floorboard condition after mat is removed', dbField: 'FLOOR_BOARD_CONDITION_DESC' },
  //Corrective Action
  { key: 'IsDeferred', display: 'Deferred', dbField: 'IS_DEFERRED' },
  { key: 'DeferralCode', display: 'Deferral Code', dbField: 'DEFERRAL_CODE' },
  { key: 'DeferralNo', display: 'Deferral #' , dbField: 'DEFERRAL_NO'},
  { key: 'RepairTypeDesc', display: 'Corrective Action Repair Type', dbField: 'REPAIR_TYPE_DESC' },
  { key: 'DefectivePartDescription', display: 'Defective Part Description', dbField: 'DEFECTIVE_PART_DESCRIPTION' },
  { key: 'ModifiedPartDescription', display: 'Modified Part Description', dbField: 'MODIFIED_PART_DESCRIPTION' },
  { key: 'RepairDescriptionTypeDesc', display: 'Repaired Description Type', dbField: 'REPAIR_DESCRIPTION_TYPE_DESC' },
  { key: 'RepairDescriptionOtherText', display: 'Repaired EmpowerMX Description', dbField: 'REPAIR_DESCRIPTION_OTHER_TEXT' },
  { key: 'RepairDocumentTypeDesc', display: 'Repair Document', dbField: 'REPAIR_DOCUMENT_TYPE_DESC' },
  { key: 'ChapFigRepairText', display: 'Repair Reference', dbField: 'CHAP_FIG_REPAIR_TEXT' },
  { key: 'EngineeringAuthorization', display: 'Engineering Authorization (EA)', dbField: 'ENGG_AUTHORIZATION' },
  { key: 'IsExternallyVisible', display: 'Externally Visible?', dbField: 'IS_EXTERNALLY_VISIBLE' },
  { key: 'RepairHeight', display: 'Repair Height (inches)', dbField: 'HEIGHT' },
  { key: 'RepairWidth', display: 'Repair Width (inches)' , dbField: 'WIDTH'},
  { key: 'IsMajorRepair', display: 'Major Repair', dbField: 'IS_MAJOR_REPAIR' },
  { key: 'MajorRepairDescription', display: 'Major Repair Description', dbField: 'MAJOR_REPAIR_DESCRIPTION' },
  //CPCP Disposition
  { key: 'IsNonCPCPRelatedEvent', display: 'Non-CPCP?', dbField: 'IS_NON_CPCP_RELATED' },
  { key: 'IsCPCPDWideSpreadCorrosion', display: 'CPCP Disposition - Widespread Corrosion?' , dbField: 'CPCPD_IS_WIDESPREAD_CORROSION'},
  { key: 'IsCorrosionLevelCorrect', display: 'Is Corrosion Level correct?', dbField: 'IS_CORROSION_LEVEL_CORRECT' },
  { key: 'CorrectedCorrosionLevelDesc', display: 'Corrected Corrosion Level' , dbField: 'CORRECTED_CORROSION_LEVEL_DESC'},
  { key: 'IsCorrosionTaskNoCorrect', display: 'Is CPCP Task # correct?', dbField: 'IS_CORRISION_TASK_NO_CORRECT'},
  { key: 'CorrectedCorrosionTaskNo', display: 'Corrected CPCP Task #' , dbField: 'CORRECTED_CORROSION_TASK_NO'},
  { key: 'CorrosionLevelChangeReasonDesc', display: 'Reason for level change', dbField: ''},
  { key: 'CorrosionLevelChangeReasonOtherText', display: 'Reason for level change(Other) - Description', dbField: 'CORROSION_LEVEL_CHANGE_REASON_DESC'},
  { key: 'EngineeringComments', display: 'Engineering Comments' , dbField: 'ENGINEERING_COMMENTS'},
  { key: 'QCFeedback', display: 'QC Feedback(CPCP Disposition)', dbField:  'QC_FEEDBACK'},
  { key: 'IsReviewComplete', display: 'Review Complete(CPCP Disposition)?', dbField: 'IS_REVIEW_COMPLETE'},
  { key: 'Reviewer', display: 'Reviewer(CPCP Disposition)', dbField: 'REVIEWER'},
  { key: 'SubmittedToQC', display: 'Submitted to QC(CPCP Disposition)?', dbField: 'SUBMITTED_TO_QC'},
  //DTE
  { key: 'DTEStatusDesc', display: 'DTE Status', dbField: 'DTE_STATUS_DESC'},
  { key: 'DTETotalShipTime', display: 'Total Ship Time(DTE)', dbField: 'DTE_AIRCFT_TTL_TM_QTY'},
  { key: 'DTECycles', display: 'Cycles(DTE)', dbField: 'DTE_AIRCFT_TTL_CYCLE_QTY'},
  { key: 'RepairInspectionStatusDesc', display: 'Repair Insp. Status', dbField: 'REPAIR_INSPECTION_STATUS_DESC'},
  { key: 'IsFatigueCritical', display: 'Fatigue Critical?' , dbField: 'IS_FATIGUE_CRITICAL'},
  { key: 'Stage1RTSDate', display: 'Stage 1/RTS Date', dbField: 'STAGE1_RTS_DATE', format: 'M/d/yyyy'},
  { key: 'Stage1Duration', display: 'Stage 1 Interval', dbField: 'STAGE1_DURATION'},
  { key: 'Stage2Date', display: 'Stage 2 Approval Date', dbField: 'STAGE2_DATE', format: 'M/d/yyyy' },
  { key: 'Stage3Date', display: 'Stage 3 Approval Date', dbField: 'STAGE3_DATE', format: 'M/d/yyyy' },
  { key: 'SRNumber', display: 'SR #', dbField: 'SR_NUMBER' },
  { key: 'RDASNumber', display: 'Dossier #', dbField: 'RDAS_NUMBER' },
  { key: 'ETDNumber', display: 'ETD #' , dbField: 'ETD_NUMBER' },
  { key: 'ESMSubItemNumber', display: 'ESM Sub/Item #' , dbField: 'ESM_SUB_ITEM_NUMBER' },
  { key: 'DTEComments', display: 'Comments(DTE)' , dbField: 'DTE_COMMENTS' },
  { key: 'DTEUpdatedBy', display: 'Updated By(DTE)' , dbField: 'DTE_UPDATED_BY'},
  { key: 'DTEUpdatedDate', display: 'Updated Date(DTE)', dbField: 'DTE_UPDATED_DATE', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'DueDate', display: 'Due Date(DTE)', dbField: 'DTE_DUE_DATE' },
  { key: 'DTEQCFeedback', display: 'QC Feedback(DTE)' , dbField: 'DTE_QC_FEEDBACK'},
  { key: 'DTESubmittedToQC', display: 'Submitted to QC(DTE)?' , dbField: 'DTE_SUBMITTED_TO_QC'},
  // { key: 'taskCardNo', display: 'Task Card #' , dbField: 'TASK_CARD_NO'},
  { key: 'RepairDate', display: 'Repair Date' , dbField: 'REPAIR_DATE', format: 'M/d/yyyy hh:mm:ss'},
  { key: 'AirlineCode', display: 'Airline Code' , dbField: 'AIRLINE_CODE'},
  { key: 'RemovedByDate', display: 'Repair Removed Date' , dbField: 'REMOVED_BY_DATE', format: 'M/d/yyyy hh:mm:ss'},
  { key: 'MrbNumber', display: 'ECO/ESO/MRB #' , dbField: 'MRB_NUMBER'},
  { key: 'MrtNumber', display: 'MRT #' , dbField: 'MRT_NUMBER'},
  { key: 'RemovedByMrt', display: 'Removed By MRT#' , dbField: 'REMOVED_BY_MRT'},
  { key: 'DteRepairStatusDesc', display: 'Status(DTE)' , dbField: 'DTE_REPAIR_STATUS_DESC'},
  { key: 'Zone', display: 'Zone' , dbField: 'ZONE'},
  { key: 'RepairLocation', display: 'Repair Location' , dbField: 'REPAIR_LOCATION'},
  { key: 'MroDocuments', display: 'Mro Documents' , dbField: 'MRO_DOCUMENTS'},
  { key: 'LegacyEA', display: 'Legacy EA' , dbField: 'LEGACY_EA'},
  { key: 'ComponentTypeDesc', display: 'Component Type' , dbField: 'DTE_COMP_TYPE_DESC'},
  { key: 'ControlOrderNumber', display: 'Control Order #' , dbField: 'CONTROL_ORDER_NUMBER'},
  { key: 'ComponentAAID', display: 'AAID' , dbField: 'COMP_AAID'},
  { key: 'ComponentSerialNumber', display: 'Component S/N' , dbField: 'COMP_SERIAL_NUM'},
  { key: 'CmbNumber', display: 'Cmb Number' , dbField: 'CMB_NUMBER'},
  { key: 'CompForAircraft', display: 'Component For Aircraft' , dbField: 'COMP_FOR_AIRCRAFT'},
  { key: 'ComponentRspam', display: 'RSPAM' , dbField: 'COMP_RSPAM'},
  { key: 'ComponentMpn', display: 'MPN' , dbField: 'COMP_MPN'},
  { key: 'ComponentHours', display: 'Hours(DTE Component)' , dbField: 'COMP_HOURS'},
  { key: 'ComponentCycles', display: 'Cycles(DTE Component) ' , dbField: 'COMP_CYCLES'},
  { key: 'OnOffWing', display: 'Wing' , dbField: 'ON_OFF_WING'},
  { key: 'Rack', display: 'Rack #' , dbField: 'RACK'},
  { key: 'EngPsn', display: 'Eng Psn' , dbField: 'ENG_PSN'},
  { key: 'EngCycles', display: 'Cycles(CSI)' , dbField: 'ENG_CYCLES'},
  { key: 'EngHours', display: 'Hours(TSI)' , dbField: 'ENG_HOURS'},
  { key: 'EngRspam', display: 'RSPAM(Engine)' , dbField: 'ENG_RSPAM'},
  { key: 'EngSn', display: 'Engine S/N:' , dbField: 'ENG_SN'},
  { key: 'EngMpn', display: 'MPN(Engine)', dbField: 'ENG_MPN' },
  { key: 'IsExistingRepair', display: 'Existing Repair?', dbField: 'IS_EXISTING_REPAIR' },
  { key: 'AtaCode1DteDesc', display: 'ATA Code1(DTE)', dbField: 'ATA_CHAPTR_DESC_DTE' },
  { key: 'AtaCode2DteDesc', display: 'ATA Code2(DTE)', dbField: 'ATA_DESC_TXT_DTE' },
  { key: 'IsActiveTrack1', display: 'Threshold 1 Is Active Track?', dbField: 'IS_ACTIVE_TRACKING1'},
  { key: 'WOLT1', display: 'Threshold 1 WOL?', dbField: 'WOLT1'},
  { key: 'DTEThresholdH1', display: 'Threshold 1 FH', dbField: 'DTE_THRESHOLD_H1'},
  { key: 'DTEThresholdC1', display: 'Threshold 1 FC', dbField: 'DTE_THRESHOLD_C1'},
  { key: 'DTEThresholdDate1', display: 'Threshold 1 Date', dbField: 'DTE_THRESHOLD_DATE1'},
  { key: 'DTEThresholdStage1Duration1', display: 'Threshold 1 Stage 1 Duration', dbField: 'DTE_THRESHOLD_STAGE1_DURATION1'},
  { key: 'IsActiveTrack2', display: 'Threshold 2 Is Active Track?', dbField: 'IS_ACTIVE_TRACKING2'},
  { key: 'WOLT2', display: 'Threshold 2 WOL?', dbField: 'WOLT2'},
  { key: 'DTEThresholdH2', display: 'Threshold 2 FH', dbField: 'DTE_THRESHOLD_H2'},
  { key: 'DTEThresholdC2', display: 'Threshold 2 FC', dbField: 'DTE_THRESHOLD_C2'},
  { key: 'DTEThresholdDate2', display: 'Threshold 2 Date', dbField: 'DTE_THRESHOLD_DATE2'},
  { key: 'DTEThresholdStage1Duration2', display: 'Threshold 2 Stage 1 Duration', dbField: 'DTE_THRESHOLD_STAGE1_DURATION2'},
  { key: 'IsActiveTrack3', display: 'Threshold 3 Is Active Track?', dbField: 'IS_ACTIVE_TRACKING3'},
  { key: 'WOLT3', display: 'Threshold 3 WOL?', dbField: 'WOLT3'},
  { key: 'DTEThresholdH3', display: 'Threshold 3 FH', dbField: 'DTE_THRESHOLD_H3'},
  { key: 'DTEThresholdC3', display: 'Threshold 3 FC', dbField: 'DTE_THRESHOLD_C3'},
  { key: 'DTEThresholdDate3', display: 'Threshold 3 Date', dbField: 'DTE_THRESHOLD_DATE3'},
  { key: 'DTEThresholdStage1Duration3', display: 'Threshold 3 Stage 1 Duration', dbField: 'DTE_THRESHOLD_STAGE1_DURATION3'},
  { key: 'IsActiveTrack4', display: 'Threshold 4 Is Active Track?', dbField: 'IS_ACTIVE_TRACKING4'},
  { key: 'WOLT4', display: 'Threshold 4 WOL?', dbField: 'WOLT4'},
  { key: 'DTEThresholdH4', display: 'Threshold 4 FH', dbField: 'DTE_THRESHOLD_H4'},
  { key: 'DTEThresholdC4', display: 'Threshold 4 FC', dbField: 'DTE_THRESHOLD_C4'},
  { key: 'DTEThresholdDate4', display: 'Threshold 4 Date', dbField: 'DTE_THRESHOLD_DATE4'},
  { key: 'DTEThresholdStage1Duration4', display: 'Threshold 4 Stage 1 Duration', dbField: 'DTE_THRESHOLD_STAGE1_DURATION4'},
  { key: 'IsActiveTrack5', display: 'Threshold 5 Is Active Track?', dbField: 'IS_ACTIVE_TRACKING5'},
  { key: 'WOLT5', display: 'Threshold 5 WOL?', dbField: 'WOLT5'},
  { key: 'DTEThresholdH5', display: 'Threshold 5 FH', dbField: 'DTE_THRESHOLD_H5'},
  { key: 'DTEThresholdC5', display: 'Threshold 5 FC', dbField: 'DTE_THRESHOLD_C5'},
  { key: 'DTEThresholdDate5', display: 'Threshold 5 Date', dbField: 'DTE_THRESHOLD_DATE5'},
  { key: 'DTEThresholdStage1Duration5', display: 'Threshold 5 Stage 1 Duration', dbField: 'DTE_THRESHOLD_STAGE1_DURATION5'},
  { key: 'DTEInspectionThresholdTFH1', display: 'Inspection 1 Threshold TFH', dbField: 'DTE_INSPECTION_THRESHOLD_H1'},
  { key: 'DTEInspectionThresholdTFC1', display: 'Inspection 1 Threshold TFC', dbField: 'DTE_INSPECTION_THRESHOLD_C1'},
  { key: 'DTEInspectionThresholdSpan1', display: 'Inspection 1 Threshold Time Span', dbField: 'DTE_THRESHOLD_SPAN1'},
  { key: 'DTEInspectionIntervalTFH1', display: 'Inspection 1 Interval TFH', dbField: 'DTE_INSPECTION_INTERVAL_H1'},
  { key: 'DTEInspectionIntervalTFC1', display: 'Inspection 1 Interval TFC', dbField: 'DTE_INSPECTION_INTERVAL_C1'},
  { key: 'DTEInspectionIntervalSpan1', display: 'Inspection 1 Interval Time Span', dbField: 'DTE_INTERVAL_SPAN1'},
  { key: 'DTEInspectionMethod1', display: 'Inspection 1 Method', dbField: 'DTE_INSPECTION_METHOD1'},
  { key: 'WOLI1', display: 'Inspection 1 WOL?', dbField: 'WOLI1'},
  { key: 'DTEInspectionThresholdTFH2', display: 'Inspection 2 Threshold TFH', dbField: 'DTE_INSPECTION_THRESHOLD_H2'},
  { key: 'DTEInspectionThresholdTFC2', display: 'Inspection 2 Threshold TFC', dbField: 'DTE_INSPECTION_THRESHOLD_C2'},
  { key: 'DTEInspectionThresholdSpan2', display: 'Inspection 2 Threshold Time Span', dbField: 'DTE_THRESHOLD_SPAN2'},
  { key: 'DTEInspectionIntervalTFH2', display: 'Inspection 2 Interval TFH', dbField: 'DTE_INSPECTION_INTERVAL_H2'},
  { key: 'DTEInspectionIntervalTFC2', display: 'Inspection 2 Interval TFC', dbField: 'DTE_INSPECTION_INTERVAL_C2'},
  { key: 'DTEInspectionIntervalSpan2', display: 'Inspection 2 Interval Time Span', dbField: 'DTE_INTERVAL_SPAN2'},
  { key: 'DTEInspectionMethod2', display: 'Inspection 2 Method', dbField: 'DTE_INSPECTION_METHOD2'},
  { key: 'WOLI2', display: 'Inspection 2 WOL?', dbField: 'WOLI2'},
  { key: 'DTEInspectionThresholdTFH3', display: 'Inspection 3 Threshold TFH', dbField: 'DTE_INSPECTION_THRESHOLD_H3'},
  { key: 'DTEInspectionThresholdTFC3', display: 'Inspection 3 Threshold TFC', dbField: 'DTE_INSPECTION_THRESHOLD_C3'},
  { key: 'DTEInspectionThresholdSpan3', display: 'Inspection 3 Threshold Time Span', dbField: 'DTE_THRESHOLD_SPAN3'},
  { key: 'DTEInspectionIntervalTFH3', display: 'Inspection 3 Interval TFH', dbField: 'DTE_INSPECTION_INTERVAL_H3'},
  { key: 'DTEInspectionIntervalTFC3', display: 'Inspection 3 Interval TFC', dbField: 'DTE_INSPECTION_INTERVAL_C3'},
  { key: 'DTEInspectionIntervalSpan3', display: 'Inspection 3 Interval Time Span', dbField: 'DTE_INTERVAL_SPAN3'},
  { key: 'DTEInspectionMethod3', display: 'Inspection 3 Method', dbField: 'DTE_INSPECTION_METHOD3'},
  { key: 'WOLI3', display: 'Inspection 3 WOL?', dbField: 'WOLI3'},
  { key: 'DTEInspectionThresholdTFH4', display: 'Inspection 4 Threshold TFH', dbField: 'DTE_INSPECTION_THRESHOLD_H4'},
  { key: 'DTEInspectionThresholdTFC4', display: 'Inspection 4 Threshold TFC', dbField: 'DTE_INSPECTION_THRESHOLD_C4'},
  { key: 'DTEInspectionThresholdSpan4', display: 'Inspection 4 Threshold Time Span', dbField: 'DTE_THRESHOLD_SPAN4'},
  { key: 'DTEInspectionIntervalTFH4', display: 'Inspection 4 Interval TFH', dbField: 'DTE_INSPECTION_INTERVAL_H4'},
  { key: 'DTEInspectionIntervalTFC4', display: 'Inspection 4 Interval TFC', dbField: 'DTE_INSPECTION_INTERVAL_C4'},
  { key: 'DTEInspectionIntervalSpan4', display: 'Inspection 4 Interval Time Span', dbField: 'DTE_INTERVAL_SPAN4'},
  { key: 'DTEInspectionMethod4', display: 'Inspection 4 Method', dbField: 'DTE_INSPECTION_METHOD4'},
  { key: 'WOLI4', display: 'Inspection 4 WOL?', dbField: 'WOLI4'},
  { key: 'DTEInspectionThresholdTFH5', display: 'Inspection 5 Threshold TFH', dbField: 'DTE_INSPECTION_THRESHOLD_H5'},
  { key: 'DTEInspectionThresholdTFC5', display: 'Inspection 5 Threshold TFC', dbField: 'DTE_INSPECTION_THRESHOLD_C5'},
  { key: 'DTEInspectionThresholdSpan5', display: 'Inspection 5 Threshold Time Span', dbField: 'DTE_THRESHOLD_SPAN5'},
  { key: 'DTEInspectionIntervalTFH5', display: 'Inspection 5 Interval TFH', dbField: 'DTE_INSPECTION_INTERVAL_H5'},
  { key: 'DTEInspectionIntervalTFC5', display: 'Inspection 5 Interval TFC', dbField: 'DTE_INSPECTION_INTERVAL_C5'},
  { key: 'DTEInspectionIntervalSpan5', display: 'Inspection 5 Interval Time Span', dbField: 'DTE_INTERVAL_SPAN5'},
  { key: 'DTEInspectionMethod5', display: 'Inspection 5 Method', dbField: 'DTE_INSPECTION_METHOD5'},
  { key: 'WOLI5', display: 'Inspection 5 WOL?', dbField: 'WOLI5'},
  { key: 'DTEMonitorItem1', display: 'FMR/Logpage/MON(1)' , dbField: 'DTE_MONITOR_ITEM1' },
  { key: 'DTEMonitorItem2', display: 'FMR/Logpage/MON(2)', dbField: 'DTE_MONITOR_ITEM2' },
  { key: 'DTEMonitorItem3', display: 'FMR/Logpage/MON(3)' , dbField: 'DTE_MONITOR_ITEM2'},
  { key: 'DTEMonitorItem4', display: 'FMR/Logpage/MON(4)', dbField: 'DTE_MONITOR_ITEM3' },
  { key: 'DTEMonitorItem5', display: 'FMR/Logpage/MON(5)', dbField: 'DTE_MONITOR_ITEM4' }
];
