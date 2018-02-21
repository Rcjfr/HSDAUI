export interface IReportOption {
  key: string;
  display: string;
  dbField?: string;
  format?: string;
}

export const ReportOptions: IReportOption[] = [
  //General Information
  { key: 'ID', display: 'SDA ID', dbField: 'ID' },
  { key: 'HistoricId', display: 'Historic SDA ID', dbField: 'HISTORIC_ID' },
  { key: 'StatusUpdatedBy', display: 'Last Updated By', dbField: 'STATUS_UPDATED_BY' },
  { key: 'StatusUpdatedOn', display: 'Last Updated On', dbField: 'STATUS_UPDATED_ON', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'Status', display: 'Current Status', dbField: 'STATUS_DESC' },
  { key: 'SdrNumber', display: 'SDR Number', dbField: 'SDR_NMBR' },
  { key: 'Station', display: 'Station', dbField: 'AIRLN_BUSISTN_CD' },

  { key: 'Department', display: 'Department', dbField: 'MNTNC_DEPT_DESC' },
  { key: 'AircraftNo', display: 'Nose Number', dbField: 'AIRCRFT_NBR' },
  { key: 'Manufacturer', display: 'Manufacturer', dbField: 'AIRCRFT_MFCTR' },
  { key: 'Model', display: 'Model', dbField: 'AIRCRFT_MDL_SRS' },
  { key: 'SerialNo', display: 'Serial #', dbField: 'AIRCRFT_SRL_NBR' },
  { key: 'TotalShipTime', display: 'Total Ship Time', dbField: 'AIRCFT_TTL_TM_QTY' },
  { key: 'Cycles', display: 'Cycles', dbField: 'AIRCFT_TTL_CYCLE_QTY' },
  { key: 'Fleet', display: 'Fleet', dbField: 'AIRCRFT_FLT_TYPE_DESC' },
  { key: 'Originator', display: 'Originator', dbField: 'ORIGINATOR'},
  { key: 'LineMaintenance', display: 'Line Maintenance?', dbField: 'LINE_MNTNC_IND' },
  { key: 'AlertCode', display: 'Alert Code', dbField: 'ALERT_DESC' },
  { key: 'AtaCode1', display: 'ATA Code 1', dbField: 'ATA_CHAPTR_DESC' },
  { key: 'AtaCode2', display: 'ATA Code 2', dbField: 'ATA_DESC_TXT' },
  { key: 'DefectDiscoveredDuring', display: 'Defect Discovered During', dbField: 'DEFCT_DSCVR_IND' },
  { key: 'UnscheduledMaintenanceDescription', display: 'Unscheduled Maintenance Description', dbField: 'UNSCHDLD_MNTNC_DESC' },
  { key: 'CheckType', display: 'Check Type', dbField: 'CHECK_TYPE_DESC' },
  { key: 'CheckTypeOtherText', display: 'Other Check Type', dbField: 'MNTNC_CHK_TYPE_OTHER_DESC' },
  { key: 'RoutineNo', display: 'Routine #', dbField: 'SCHD_MNTNC_RTN_TASK_CARD_TXT'},
  { key: 'NonRoutineNo', display: 'Non-Routine #', dbField: 'SCHD_MNTNC_NONRTN_TASKCARD_TXT' },
  { key: 'ESMReference', display: 'ESM Reference #', dbField: 'SCHD_MNTNC_ESM_REFERENCE_TXT' },
  { key: 'MicNo', display: 'MIC #', dbField: 'MTNC_INCDNT_CHK_TXT' },
  { key: 'CreateDate', display: 'Create Date', format: 'M/d/yyyy', dbField: 'CREATEDATE' },


  //Description and Location of Defects or Damage
  { key: 'DamageType', display: 'Damage Type', dbField: 'STRUCT_DAMAGE_DESC' },
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
  { key: 'DetectionMethod', display: 'How Detected', dbField: 'DEFECT_DETECTED_DESC' },
  { key: 'DetectionMethodOtherDescription', display: 'How Detected(Other)', dbField: 'DEFECT_DETECTED_OTHER_TEXT' },

  //Corrosion Prevention Control Program
  { key: 'IsCPCPRelatedEvent', display: 'Is CPCP related event?', dbField: 'IS_CPCP_RELATED' },
  { key: 'IsWideSpreadCorrosion', display: 'Widespread Corrosion', dbField: 'IS_WIDESPREAD_CORROSION' },
  { key: 'CorrosionLevel', display: 'Corrosion Level', dbField: 'CORROSION_LEVEL_DESC' },
  { key: 'IsPreviouslyBlended', display: 'Corroded Area Previously Blended', dbField: 'CORRODED_AREA_PREVIOUSLY_BLENDED' },
  { key: 'CorrosionType', display: 'Type of Corrosion', dbField: 'CORROSION_TYPE_DESC' },
  { key: 'CorrosionTypeOtherText', display: 'Type of Corrosion(Other)', dbField: 'CORROSION_TYPE_OTHER_DESCRIPTION' },
  { key: 'CorrosionTaskNo', display: 'Corrosion Task #', dbField: 'CORROSION_TASK_NO' },

  { key: 'CausesOfDamage', display: 'Cause of Damage', dbField: 'CAUSE_OF_DAMAGE_DESC' },
  { key: 'CauseOfDamageOtherText', display: 'Cause of Damage(Other) Description', dbField: 'CAUSE_OF_DAMAGE_OTHER_DESCRIPTION' },
  { key: 'FloorBoardCondition', display: 'Floorboard condition after mat is removed', dbField: 'FLOOR_BOARD_CONDITION_DESC' },

  //Corrective Action
  { key: 'IsDeferred', display: 'Deferred', dbField: 'IS_DEFERRED' },
  { key: 'DeferralCode', display: 'SCEPTRE Deferral Code', dbField: 'DEFERRAL_CODE' },
  { key: 'DeferralNo', display: 'Deferral #' , dbField: 'DEFERRAL_NO'},
  { key: 'RepairType', display: 'Corrective Action Repair Type', dbField: 'REPAIR_TYPE_DESC' },
  { key: 'DefectivePartDescription', display: 'Defective Part Description', dbField: 'DEFECTIVE_PART_DESCRIPTION' },
  { key: 'ModifiedPartDescription', display: 'Modified Part Description', dbField: 'MODIFIED_PART_DESCRIPTION' },
  { key: 'RepairDescriptionType', display: 'Repaired Description Type', dbField: 'REPAIR_DESCRIPTION_TYPE_DESC' },
  { key: 'RepairDescriptionOtherText', display: 'Repaired EmpowerMX Description', dbField: 'REPAIR_DESCRIPTION_OTHER_TEXT' },
  { key: 'RepairDocumentType', display: 'Repair Document', dbField: 'REPAIR_DOCUMENT_TYPE_DESC' },
  { key: 'ChapFigRepairText', display: 'Chap/Fig/Repair', dbField: 'CHAP_FIG_REPAIR_TEXT' },
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
  { key: 'CorrectedCorrosionLevel', display: 'Corrected Corrosion Level' , dbField: 'CORRECTED_CORROSION_LEVEL_DESC'},
  { key: 'IsCorrosionTaskNoCorrect', display: 'Is CPCP Task # correct?', dbField: 'IS_CORRISION_TASK_NO_CORRECT'},
  { key: 'CorrectedCorrosionTaskNo', display: 'Corrected CPCP Task #' , dbField: 'CORRECTED_CORROSION_TASK_NO'},
  { key: 'CorrosionLevelChangeReason', display: 'Reason for level change', dbField: ''},
  { key: 'CorrosionLevelChangeReasonOtherText', display: 'Reason for level change(Other) - Description', dbField: 'CORROSION_LEVEL_CHANGE_REASON_OTHER_TEXT'},
  { key: 'EngineeringComments', display: 'Engineering Comments' , dbField: 'ENGINEERING_COMMENTS'},
  { key: 'QCFeedback', display: 'QC Feedback(CPCP Disposition)', dbField:  'QC_FEEDBACK'},
  { key: 'IsReviewComplete', display: 'Review Complete(CPCP Disposition)?', dbField: 'IS_REVIEW_COMPLETE'},
  { key: 'Reviewer', display: 'Reviewer(CPCP Disposition)', dbField: 'REVIEWER'},
  { key: 'SubmittedToQC', display: 'Submitted to QC(CPCP Disposition)?', dbField: 'SUBMITTED_TO_QC'},

  //DTE
  { key: 'DTEStatus', display: 'DTE Status', dbField: 'DTE_STATUS_DESC'},
  { key: 'DTETotalShipTime', display: 'Total Ship Time(DTE)', dbField: 'DTE_AIRCFT_TTL_TM_QTY'},
  { key: 'DTECycles', display: 'Cycles(DTE)', dbField: 'DTE_AIRCFT_TTL_CYCLE_QTY'},
  { key: 'RepairInspectionStatus', display: 'Repair Insp. Status', dbField: 'REPAIR_INSPECTION_STATUS_DESC'},
  { key: 'IsFatigueCritical', display: 'Fatigue Critical?' , dbField: 'IS_FATIGUE_CRITICAL'},
  { key: 'Stage1RTSDate', display: 'Stage 1/RTS Date', dbField: 'STAGE1_RTS_DATE'},
  { key: 'Stage1Duration', display: 'Stage 1 Interval', dbField: 'STAGE1_DURATION', format: 'M/d/yyyy' },
  { key: 'Stage2Date', display: 'Stage 2 Approval Date', dbField: 'STAGE2_DATE', format: 'M/d/yyyy' },
  { key: 'Stage3Date', display: 'Stage 3 Approval Date', dbField: 'STAGE3_DATE', format: 'M/d/yyyy' },
  { key: 'SRNumber', display: 'SR #', dbField: 'SR_NUMBER' },
  { key: 'RDASNumber', display: 'RDAS #', dbField: 'RDAS_NUMBER' },
  { key: 'ETDNumber', display: 'ETD #' , dbField: 'ETD_NUMBER' },
  { key: 'ESMSubItemNumber', display: 'ESM Sub/Item #' , dbField: 'ESM_SUB_ITEM_NUMBER' },
  { key: 'DTEComments', display: 'Comments(DTE)' , dbField: 'DTE_COMMENTS' },
  { key: 'DTEUpdatedBy', display: 'Updated By(DTE)' , dbField: 'DTE_UPDATED_BY'},
  { key: 'DTEUpdatedDate', display: 'Updated Date(DTE)', dbField: 'DTE_UPDATED_DATE', format: 'M/d/yyyy hh:mm:ss' },
  { key: 'DueDate', display: 'Due Date(DTE)', dbField: 'DTE_DUE_DATE' },
  { key: 'DTEQCFeedback', display: 'QC Feedback(DTE)' , dbField: 'DTE_QC_FEEDBACK'},
  { key: 'DTESubmittedToQC', display: 'Submitted to QC(DTE)?' , dbField: 'DTE_SUBMITTED_TO_QC'},
  { key: 'DTEInspectionThreshold1', display: 'Inspection Threshold(1)', dbField: 'DTE_INSPECTION_THRISHOLD1' },
  { key: 'DTEInspectionThreshold2', display: 'Inspection Threshold(2)', dbField: 'DTE_INSPECTION_THRISHOLD2' },
  { key: 'DTEInspectionThreshold3', display: 'Inspection Threshold(3)', dbField: 'DTE_INSPECTION_THRISHOLD3' },
  { key: 'DTEInspectionThreshold4', display: 'Inspection Threshold(4)', dbField: 'DTE_INSPECTION_THRISHOLD4' },
  { key: 'DTEInspectionThreshold5', display: 'Inspection Threshold(5)', dbField: 'DTE_INSPECTION_THRISHOLD5' },

  { key: 'DTEInspectionInterval1', display: 'Inspection Interval(1)', dbField: 'DTE_INSPECTION_INTERVAL1' },
  { key: 'DTEInspectionInterval2', display: 'Inspection Interval(2)', dbField: 'DTE_INSPECTION_INTERVAL2' },
  { key: 'DTEInspectionInterval3', display: 'Inspection Interval(3)', dbField: 'DTE_INSPECTION_INTERVAL3' },
  { key: 'DTEInspectionInterval4', display: 'Inspection Interval(4)', dbField: 'DTE_INSPECTION_INTERVAL4' },
  { key: 'DTEInspectionInterval5', display: 'Inspection Interval(5)', dbField: 'DTE_INSPECTION_INTERVAL5' },
  { key: 'DTEInspectionMethod1', display: 'Inspection Method(1)', dbField: 'DTE_INSPECTION_METHOD1' },
  { key: 'DTEInspectionMethod2', display: 'Inspection Method(2)' , dbField: 'DTE_INSPECTION_METHOD2'},
  { key: 'DTEInspectionMethod3', display: 'Inspection Method(3)' , dbField: 'DTE_INSPECTION_METHOD3'},
  { key: 'DTEInspectionMethod4', display: 'Inspection Method(4)', dbField: 'DTE_INSPECTION_METHOD4' },
  { key: 'DTEInspectionMethod5', display: 'Inspection Method(5)' , dbField: 'DTE_INSPECTION_METHOD5'},
  { key: 'DTEMonitorItem1', display: 'FMR/Logpage/MON(1)' , dbField: 'DTE_MONITOR_ITEM1' },
  { key: 'DTEMonitorItem2', display: 'FMR/Logpage/MON(2)', dbField: 'DTE_MONITOR_ITEM2' },
  { key: 'DTEMonitorItem3', display: 'FMR/Logpage/MON(3)' , dbField: 'DTE_MONITOR_ITEM2'},
  { key: 'DTEMonitorItem4', display: 'FMR/Logpage/MON(4)', dbField: 'DTE_MONITOR_ITEM3' },
  { key: 'DTEMonitorItem5', display: 'FMR/Logpage/MON(5)', dbField: 'DTE_MONITOR_ITEM4' }
];
