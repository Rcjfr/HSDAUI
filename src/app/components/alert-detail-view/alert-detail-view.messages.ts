// Defines all of the validation messages for the form.

export const ValidationMessages: { [key: string]: { [key: string]: any } } = {
  'generalSectionFormGroup': {
    'sdrNumber': {
      required: 'SDR Number is required.',
      pattern: 'SDR Number must be alphanumeric.'
    },
    'createDate': {
      required: 'Create Date is required.',
      future: 'Create Date can not be a future date.'
    },
    'alertCode': {
      required: 'Alert Code is required.'
    },
    'station': {
      required: 'Station is required.',
      minlength: 'Station must be 3 characters.',
      pattern: 'Station must contain only alphabet characters.'
    },
    'ataCodesSectionFormGroup': {
      'ataCode1': {
        //required: 'ATA Code 1 is required.'
      },
      'ataCode2': {
        //required: 'ATA Code 2 is required.'
      }
    },
    'department': {
      required: 'Department is required.'
    }
    ,
    'originator': {
      required: 'Name is required.',
      maxlength: 'Name must not be more than 50 characters.',
      pattern: 'Name must contain only alphanumeric characters.'
    },
    'originatorBadgeNo': {
      required: 'Employee ID is required.',
      maxlength: 'Employee ID must not be more than 15 characters.',
      pattern: 'Employee ID must contain only alphanumeric characters.'
    },
    'aircraftInfoSectionFormGroup': {
      'aircraftNo': {
        required: 'Aircraft Nose # is required.',
        pattern: 'Aircraft Nose # must be alphanumeric.',
        maxlength: 'Aircraft Nose # must not be more than 5 characters.'
      },
      'aircraftRegistrationNo': {
        required: 'Aircraft Registration # is required.',
        pattern: 'Aircraft Registration # must be alphanumeric.',
        maxlength: 'Aircraft Registration # must not be more than 50 characters.'
      },
      'manufacturer': {
        required: 'Manufacturer is required.',
        pattern: 'Manufacturer must be alphanumeric.',
        maxlength: 'Manufacturer must not be more than 100 characters.'
      },
      'model': {
        required: 'Aircraft Model/Series is required.',
        pattern: 'Aircraft Model/Series must be alphanumeric.',
        maxlength: 'Aircraft Model/Series must not be more than 15 characters.'
      },
      'serialNo': {
        required: 'Serial # is required.',
        pattern: 'Serial # must be alphanumeric.',
        maxlength: 'Serial # must not be more than 10 characters.'
      },
      'totalShipTime': {
        required: 'Total Ship Time is required.',
        pattern: 'Total Ship Time must be numeric.',
        maxlength: 'Total Ship Time must not be more than 25 numbers.'
      },
      'cycles': {
        required: 'Cycles is required.',
        pattern: 'Cycles must be numeric.',
        maxlength: 'Cycles must not be more than 25 numbers.'
      },
      'fleet': {
        required: 'Fleet is required.',
        maxlength: 'Fleet must not be more than 20 characters.'
      }
    },
    'defectDiscoveredDuringSectionFormGroup': {
      'defectDiscoveredDuring': {
        required: 'Defect Discovered during is required.'
      },
      'scheduledMaintenanceGroup': {
        atleastone: 'Routine # or Non-Routine # is required.',
        'checkType': {
          required: 'Check Type is required.'
        },
        'checkTypeOtherText': {
          required: 'Check Type(Other) description is required.',
          maxlength: 'Check Type(Other) description must not be more than 50 characters.'
        },
        'routineNo': {
          pattern: 'Routine # must contain only alphanumerics.',
          maxlength: 'Routine # must not be more than 150 characters.'
        },
        'nonRoutineNo': {
          pattern: 'Non-Routine # must contain only alphanumerics.',
          maxlength: 'Non-Routine # must not be more than 150 characters.'
        },
        'esmReference': {
          maxlength: 'ESM Reference # must not be more than 50 characters.'
        }
      },
      'unscheduledMaintenanceGroup': {
        atleastone: 'Non-Routine # or MIC # is required.',
        'unscheduledMaintenanceDescription': {
          maxlength: 'Description must not be more than 250 characters.',
          required: 'Description is required.'
        },
        'nonRoutineNo': {
          pattern: 'Non-Routine # must contain only alphanumerics.',
          maxlength: 'Non-Routine # must not be more than 50 characters. '

        },
        'micNo': {
          pattern: 'MIC # must contain only alphanumerics.',
          maxlength: 'MIC # must not be more than 50 characters. '
        }
      }
    }
  },
  defectLocationSectionFormGroup: {
    'damageType': {
      required: 'Damage Type is required.',
      maxlength: 'Damage Type must not be more than 250 characters.'
    },
    'damageDescription': {
      required: 'Damage Description is required.',
      maxlength: 'Damage Description must not be more than 250 characters.'
    },
    'length': {
      required: 'Length  is required.',
      maxlength: 'Length must be 3X3.',
      pattern: 'Length can be till 3X3 and must be numeric .'
    },
    'width': {
      required: 'Width is required.',
      maxlength: 'Width must be 3X3.',
      pattern: 'Width can be till 3X3 and must be numeric.'
    },
    'depth': {
      required: 'Depth is required.',
      maxlength: 'Depth must be 3X4.',
      pattern: 'Depth can be till 3X3 and must be 3X4 and numeric.'
    },


    'preciseLocationGroup': {
      aleasttwo: 'At least two of the fields (Station, Stringer, WL, BL) are required.',
      'aircraftStation': {

        pattern: 'Station must be alphanumeric.',
        maxlength: 'Station must not be more than 100 characters.'
      },
      'stringer': {

        pattern: 'Stringer must be alphanumeric.',
        maxlength: 'Stringer must not be more than 100 characters.'
      },
      'waterLine': {

        pattern: 'WL must be alphanumeric.',
        maxlength: 'WL must not be more than 100 characters.'
      },
      'buttLine': {

        pattern: 'BL must be alphanumeric.',
        maxlength: 'BL must not be more than 100 characters.'
      }
    },
    'manufacturerPartNo': {

      pattern: 'MFG Part # must be alphanumeric.',
      maxlength: 'MFG Part # must not be more than 100 characters.'
    }
    ,
    'partDefective': {
      required: 'Part Defective is required.',
      maxlength: 'Part Defective must not be more than 100 characters.',
      pattern: 'Part Defective must be alphanumeric.'
    }
    ,
    'manufacturerSerialNo': {

      pattern: 'MFG Serial # must be alphanumeric.',
      maxlength: 'MFG Serial # must not be more than 100 characters.'
    },
    'partTT': {
      pattern: 'Part TT must be numeric.',
      maxlength: 'Part TT must not be more than 25 numbers.'
    },
    'partTSO': {
      pattern: 'Part TSO must be numeric.',
      maxlength: 'Part TSO must not be more than 25 numbers.'
    },
    'detectionMethod': {
      required: 'How Detected is required.'

    },
    'detectionMethodOtherDescription': {
      required: 'Detection Method(Other) description is required.',
      maxlength: 'Detection Method(Other) description must not be more than 250 characters.'

    }

  },
  cpcpSectionGroup: {
    isCPCPRelatedEvent: {
      required: 'CPCP  is required.'
    },
    isWideSpreadCorrosion: {
      required: 'Widespread Corrosion is required.'
    },
    corrosionLevel: {
      required: 'Corrosion level is required.'
    },
    isPreviouslyBlended: {
      required: 'Corroded Area Previously Blended is required.'
    },
    corrosionTaskNo: {
      required: 'Corrosion Task # required.',
      pattern: 'Corrosion Task # must be alphanumeric.',
      maxlength: 'Corrosion Task # must not be more than 25 characters.'

    },
    corrosionType: {
      required: 'Type of Corrosion is required.'
    },
    corrosionTypeOtherText: {
      required: 'Description is  required.',
      maxlength: 'Description must be not more than 250 characters.'
    },
    floorBoardCondition: {
      //  required: ' Floorboard condition after mat is removed is  required.',
    },
    causeOfDamageGroup: {
      atleastone: 'At least one cause of damage must be selected',
      causeOfDamageDescriptionGroup: {
        'causeOfDamageOtherText': {
          required: 'Description is required.',
          maxlength: 'Description must not be more than 250 characters.'
        }
      }
    }
  },
  'correctiveActionFormGroup': {
    'isDeferred': {
      required: 'Deferred is required.'
    },
    'deferralCode': {
      required: 'Deferral Code is required.',
      pattern: 'Deferral Code must contain only alphabet characters.',
      maxlength: 'Deferral Code must not be more than 3 characters.'
    },
    'deferralNo': {
      required: 'Deferral #  is required.',
      pattern: 'Deferral # must be alphanumeric.',
      maxlength: 'Deferral # must not be more than 50 characters. '
    },
    'isMajorRepair': {
      required: 'Major Repair is required.'
    },
    'majorRepairDescription': {
      required: 'Repair Description is required.',
      maxlength: 'Repair Description must not be more than 250 characters.'
    },
    'repairDocumentType': {
      required: 'Repair Document is required.'
    },
    'correctiveActionChapFormGroup': {
      'chapFigRepairText': {
        required: 'Repair Reference is required.',
        maxlength: 'Repair Reference must not be more than 100 characters.',
      }
    },
    'correctiveActionOptionFormGroup': {
      'repairType': {
        required: 'Repair Type is required.'
      },
      'modifiedPartDescriptionGroup': {
        'modifiedPartDescription': {
          required: 'Description is required.',
          maxlength: 'Description must not be more than 250 characters.',
        }
      },
      'defectivePartDescriptionGroup': {
        'defectivePartDescription': {
          required: 'Description is required.',
          maxlength: 'Description must not be more than 250 characters.',
          pattern: 'Description must be alphanumeric.'
        }
      },
      'correctiveActionRepairDescriptionFormGroup': {
        atleastone: 'Repair Document or Engineering  Authorization is required.',
        'repairDescriptionType': {
          required: 'Description is required.'
        },
        'repairDescriptionOtherText': {
          required: 'Other Description is required.',
          maxlength: 'Other Description must not be more than 250 characters.',
        },
        'engineeringAuthorization': {

          maxlength: 'Engineering  Authorization must not be more than 100 characters.',
          pattern: 'Engineering  Authorization must be alphanumeric.'

        },
        'isExternallyVisible': {
          required: 'Externally Visible is required.'
        },
        'repairWidth': {
          pattern: 'Width must be numeric.',
          maxlength: 'Width must not be more than 3 digits.'
        },
        'repairHeight': {
          pattern: 'Height must be numeric.',
          maxlength: 'Height must not be more than 3 digits.'
        }
      }
    },
    'completedBy': {
      required: 'Completed By is required.',
      maxlength: 'Completed By must not be more than 50 characters.'
    },
    'completedDate': {
      required: 'Completed Date is required.',
    }
  }
  , 'currentStatusSectionGroup': {
    openStatus: {},
    completedStatus: {},
    auditedStatus: {},
    closedStatus: {},
    deletedStatus: {},

    inspector: {
      required: 'Inspector is required.',
      maxlength: 'Inspector must not be more than 50 characters.'
    },
    inspectionDate: {
      required: 'Inspection Date is required.'
    }
    ,

    manager: {
      required: 'QC Manager/Designee is required.',
      maxlength: 'QC Manager/Designee must not be more than 50 characters.'
    },
    auditDate: { required: 'Audit Date is required.' }
    ,

    rejectReason: {
      required: 'Rejection reason is required.',
      maxlength: 'Rejection reason must not be more than 250 characters.'

    },

    deleteReason: {
      required: 'Deletion reason is required.',
      maxlength: 'Deletion reason must not be more than 250 characters.'
    }

  }
  , 'cpcpDispositionSectionFormGroup': {
    'isCorrosionTaskNoCorrect': {
      required: 'Is CPCP Task # Correct, is required.'
    },
    'isCorrosionLevelCorrect': {
      required: 'Is Corrosion Level Correct, is required.'
    },
    'correctedCorrosionTaskNo': {
      required: 'CPCP Task # is required.',
      maxlength: 'CPCP Task # must not be more than 25 characters.'
    },
    'corrosionLevelChangeReason': {
      required: 'Reason for change is required.'
    },
    'corrosionLevelChangeReasonOtherText': {
      required: 'Reason for Change(Other) is required.',
      maxlength: 'Reason for Change(Other) must not be more than 250 characters.'
    },
    'isWideSpreadCorrosion': {
      required: 'Corrosion is required.'
    },
    'engineeringComments': {
      required: 'Engineering Comments is required.',
      maxlength: 'Engineering Comments must not be more than 500 characters.'
    },
    'qcFeedback': {
      required: 'QC Feedback is required.',
      maxlength: 'QC Feedback must not be more than 500 characters.'
    },
    'reviewer': {
      maxlength: 'Reviewer must not be more than 50 characters.',
      required: 'Reviewer is required.'
    },
    'reviewerBadgeNo': {
      maxlength: 'Reviewer BadgeNo must not be more than 10 characters.',
      required: 'Reviewer BadgeNo is required.'
    }

  },
  'repairDetailsSectionGroup': {
    'engineeringAuthorization': {
      maxlength: 'Engineering Authorization must not be more than 25 characters.'
    },
    'routineTaskCard': {
      maxlength: 'Routine Task Card # must not be more than 50 characters.'
    },
    'nonRoutine': {
      maxlength: 'Non Routine # must not be more than 50 characters.'
    },
    'repairDocumentType': {

    },
    'chapFigRepairText': {
      maxlength: 'Repair Reference must not be more than 25 characters.'
    },
    'repairDescriptionType': {

    },
    'partNomenclature': {
      maxlength: 'Part Nomenclature must not be more than 50 characters.'
    },
    'partNumber': {
      maxlength: 'Part Number must not be more than 50 characters.'
    },
    'partSerialNumber': {
      maxlength: 'Part Serial Number must not be more than 50 characters.'
    },
    'height': {
      pattern: 'Height must be numeric.',
      maxlength: 'Height must not be more than 3 digits.'
    },
    'width': {
      pattern: 'Width must be numeric.',
      maxlength: 'Width must not be more than 3 digits.'
    }

  }
  , 'damageToleranceEvaluationGroup': {
    dteStatus: {
      required: 'DTE Status is required.'
    },
    'totalShipTime': {
      required: 'Total Ship Time is required.',
      pattern: 'Total Ship Time must be numeric.',
      maxlength: 'Total Ship Time must not be more than 20 numbers.'
    },
    'cycles': {
      required: 'Cycles is required.',
      pattern: 'Cycles must be numeric.',
      maxlength: 'Cycles must not be more than 20 numbers.'
    },
    'ataCodesSectionFormGroup': {
      'ataCode1': {
        required: 'ATA Code 1 is required.'
      },
      'ataCode2': {
        required: 'ATA Code 2 is required.'
      }
    },
    repairInspectionStatus: {
      required: 'Repair Inspection Status is required.'
    },
    isExistingRepair: {
      required: 'Repair Type is required.'
    },
    isFatigueCritical: {
      required: 'Fatigue Critical is required.'
    },
    stage1RTSDate: {
      required: 'Stage 1/RTS Date is required.'
    },
    stage1Duration: {
      required: 'Stage 1 Duration is required.'
    },
    srNumber: {
      maxlength: 'SR # must not be more than 50 characters.'
    },
    rdasNumber: {
      maxlength: 'Dossier # must not be more than 25 characters.'
    },
    etdNumber: {
      maxlength: 'ETD # must not be more than 25 characters.'
    },
    esmSubItemNumber: {
      maxlength: 'ESM Sub/Item # must not be more than 50 characters.'
    },
    taskCardNo: {
      maxlength: 'Task Card # must not be more than 150 characters.'
    },
    airlineCode: {
      maxlength: 'Airline Code must not be more than 3 characters.'
    },
    mrbNumber: {
      maxlength: 'MRB # must not be more than 50 characters.'
    },

    mrtNumber: {
      maxlength: 'MRT # must not be more than 15 characters.'
    },

    removedByMrt: {
      maxlength: 'Removed By MRT # must not be more than 150 characters.'
    },

    zone: {
      maxlength: 'Zone must not be more than 50 characters.'
    },

    repairLocation: {
      maxlength: 'Location of Repair must not be more than 100 characters.'
    },

    mroDocuments: {
      maxlength: 'MRO Documents must not be more than 150 characters.'
    },

    legacyEA: {
      maxlength: 'Legacy EA must not be more than 100 characters.'
    },
     thresholdItems: {
      inspectionThreshold: {
        required: 'Inspection Threshold is required.',
        maxlength: 'Inspection Threshold must not be more than 50 characters.'
      },
      inspectionInterval: {
        required: 'Inspection Interval is required.',
        maxlength: 'Inspection Interval must not be more than 50 characters.'
      },
      inspectionMethod: {
        required: 'Inspection Method is required.',
        maxlength: 'Inspection Method must not be more than 50 characters.'
      }
    },
    'dteComponentGroup': {
      controlOrderNumber: {
        maxlength: 'Control Order # must not be more than 50 characters.'
      },
      componentAAID: {
        maxlength: 'AAID must not be more than 10 characters.'
      },
      componentSerialNumber: {
        maxlength: 'Component S/N must not be more than 25 characters.'
      },
      cmbNumber: {
        maxlength: 'CMB Number Code must not be more than 25 characters.'
      },
      compForAircraft: {
        maxlength: 'Component For Aircraft must not be more than 10 characters.'
      },
      componentRspam: {
        maxlength: 'RSPAM must not be more than 25 characters.'
      },
      componentMpn: {
        maxlength: 'MPN must not be more than 25 characters.'
      },
      componentHours: {
        maxlength: 'Comp Hours must not be more than 10 characters.'
      },
      componentCycles: {
        maxlength: 'Comp Cycles must not be more than 10 characters.'
      }
    },
    'dteEngineGroup': {
      rack: {
        maxlength: 'Rack # must not be more than 50 characters.'
      },
      engCycles: {
        maxlength: 'Cycles(CSI) must not be more than 10 characters.'
      },
      engHours: {
        maxlength: 'Hours(TSI) must not be more than 10 characters.'
      },
      engRspam: {
        maxlength: 'RSPAM must not be more than 25 characters.'
      },
      engSn: {
        maxlength: 'Engine S/N must not be more than 25 characters.'
      },
      engMpn: {
        maxlength: 'MPN must not be more than 25 characters.'
      }
   },
    monitorItems: {
      monitorItemDescription: {
        required: 'FMR/Logpage/Mon is required.',
        maxlength: 'FMR/Logpage/Mon must not be more than 25 characters.'
      }
    },
    comments: {
      maxlength: 'DTE Comments must not be more than 500 characters.'
    },
    qcFeedback: {
      maxlength: 'QC Feedback must not be more than 250 characters.'
    },
    updatedBy: {
      required: 'Updated By is required.',
      maxlength: 'Updated By must not be more than 50 characters.'
    },
    updatedDate: {
      required: 'Updated Date is required.',
      maxlength: 'Updated Date must not be more than 20 characters.'
    },
    dueDate: {
      required: 'Updated Date is required.',
      maxlength: 'Updated Date must not be more than 20 characters.'
    },
  }
};
