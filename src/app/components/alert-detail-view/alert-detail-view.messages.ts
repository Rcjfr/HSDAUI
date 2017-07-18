// Defines all of the validation messages for the form.

export const ValidationMessages: { [key: string]: { [key: string]: any } } = {
  'generalSectionFormGroup': {
    'sdrNumber': {
      required: 'SDR Number is required.',
      pattern: 'SDR Number must be alphanumeric.'
    },
    'createDate': {
      required: 'Create Date is required.'
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
        required: 'ATA Code 1 is required.'
      },
      'ataCode2': {
        required: 'ATA Code 2 is required.'
      }
    },
    'department': {
      required: 'Department is required.'
    },
    'aircraftInfoSectionFormGroup': {
      'aircraftNo': {
        required: 'Aircraft # is required.',
        pattern: 'Aircraft # must be alphanumeric.',
        maxlength: 'Aircraft # must not be more than 5 characters.'
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
      },
      'originator': {
          required: 'Originator is required.',
          maxlength: 'Originator must not be more than 50 characters.'
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
        'routineNo': {
          pattern: 'Routine # must contain only alphanumerics.',
          maxlength: 'Routine # must not be more than 50 characters.  '
        },
        'nonRoutineNo': {
          pattern: 'Non-Routine # must contain only alphanumerics.',
          maxlength: 'Non-Routine # must not be more than 50 characters. '
        }
      },
      'unscheduledMaintenanceGroup': {
        atleastone: 'Non-Routine # or MIC # is required.',
        'unscheduledMaintenanceDescription': {
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
        maxlength: 'Station must not be more than 50 characters.'
      },
      'stringer': {

        pattern: 'Stringer must be alphanumeric.',
        maxlength: 'Stringer must not be more than 25 characters.'
      },
      'waterLine': {

        pattern: 'WL must be alphanumeric.',
        maxlength: 'WL must not be more than 25 characters.'
      },
      'buttLine': {

        pattern: 'BL must be alphanumeric.',
        maxlength: 'BL must not be more than 25 characters.'
      }
    },
    'manufacturerPartNo': {

      pattern: 'MFG Part # must be alphanumeric.',
      maxlength: 'MFG Part # must not be more than 50 characters.'
    }
    ,
    'partDefective': {
      required: 'Part Defective is required.',
      maxlength: 'Part Defective must not be more than 50 characters.',
      pattern: 'Part Defective must be alphanumeric.'
    }
    ,
    'manufacturerSerialNo': {

      pattern: 'MFG Serial # must be alphanumeric.',
      maxlength: 'MFG Serial # must not be more than 50 characters.'
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

    }
  },
  cpcpSectionGroup: {
    iscpcpRelatedEvent: {
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
      maxlength: 'Corrosion Task # must not be more than 25 numbers.'

    },
    corrosionType: {
      required: 'Type of Corrosion is required.'
    },
    corrosionTypeOtherText: {
      required: 'Description is  required.',
      maxlength: 'Description must be not more than 250 numbers.'
    },
    floorBoardCondition: {
      //  required: ' Floorboard condition after mat is removed is  required.',
    },
    causeOfDamageGroup: {
      atleastone: 'At least one cause of damage must be selected',
      causeOfDamageDescriptionGroup: {
        'damageDescription': {
          required: 'Description is required.',
          maxlength: 'Description must not be more than 250 characters.'
        }
      }
    }
  },
  'correctiveActionFormGroup': {
    'deferralCode': {
      required: 'Deferral Code is required.',
      pattern: 'Deferral Code must contain only alphabet characters.',
      maxlength: 'Deferral Code must not be more than 3 characters.'
    },
    'deferral': {
      required: 'Deferral #  is required.',
      pattern: 'Deferral # must be alphanumeric.',
      maxlength: 'Deferral # must not be more than 15 characters. '
    },
    'repairDescription': {
      required: 'Repair Description is required.',
      maxlength: 'Repair Description must not be more than 250 characters.'
    },
    'correctiveActionOptionFormGroup': {
      'correctiveActionOptions': {
        required: 'Defect Discovered during is required.'
        },
        'modifiedPartDescriptionGroup': {
      'modifiedpartDescription': {
        required: 'Description is required.',
        maxlength: 'Description must not be more than 30 characters.',
            }
      },
        'defectivePartDescriptionGroup': {
      'defectivePartDescription': {
        required: 'Description is required.',
        maxlength: 'Description must not be more than 30 characters.',
        pattern: 'Description must be alphanumeric.'
            }
        },
      'correctiveActionRepairDescriptionFormGroup': {
        atleastone: 'Repair Document or Engineering  Authorization is required.',
        'repairedDescribe': {
          required: 'Description is required.'

        },
        'repairDocument': {

        },
        'correctiveActionChapFormGroup': {
          'chap': {
            required: 'Chap/Fig/Repair is required.',
            maxlength: 'Chap/Fig/Repair must not be more than 30 characters.',
          }
        },
        'engineeringAuthorization': {

          maxlength: 'Engineering  Authorization must not be more than 25 characters.',
          pattern: 'Engineering  Authorization must be alphanumeric.'

        },
        'externalVisible': {
          required: 'Externally Visible is required.'
        },
        'repairWidth': {
          pattern: 'Width must be numeric.',
          maxlength: 'Width must not be more than 3 digits.'
        },
        'height': {
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

  }, 'cpcpDispositionSectionFormGroup': {
      'cpcpTaskDescriptionFormGroup': {
          'cpcpTask': {
              required: 'CPCP Task # is required.',
              maxlength: 'CPCP Task # must not be more than 25 characters.'
          }
      },
      'reasonForChangeTextBox': {
          maxlength: 'Reason For Change must not be more than 250 characters.'
      },
      'corrosion': {
          required: 'Corrosion is required.'
      },
      'engineeringComments': {
          required: 'Engineering Comments is required.',
          maxlength: 'Engineering Comments must not be more than 250 characters.'
      },
      'qcFeedback': {
          required: 'QC Feedback is required.',
          maxlength: 'QC Feedback must not be more than 250 characters.'
      },
      'reviewComplete': {
          maxlength: 'Review Complete must not be more than 50 characters.'
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
      'repairDocument': {

      },
      'chap': {
          maxlength: 'Chap/Fig/Repair must not be more than 25 characters.'
      },
      'repairedDescribe': {

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
    repairInspectionStatus: {
      required: 'Repair Inspection Status is required.'
    },
    stage1RTSDate: {
      required: 'Stage 1/RTS Date is required.'
    },
    srNo: {
      maxlength: 'SR # must not be more than 25 characters.'
    },
    rdasNo: {
      maxlength: 'RDAS # must not be more than 25 characters.'
    },
    etdNo: {
      maxlength: 'ETD # must not be more than 25 characters.'
    },
    esmSubItemNo: {
      maxlength: 'ESM Sub/Item # must not be more than 25 characters.'
    },
    thresholds: {
      inspectionThreshold: {
        maxlength: 'Inspection Threshold must not be more than 50 characters.'
      },
      inspectionInterval: {
        maxlength: 'Inspection Interval must not be more than 50 characters.'
      },
      inspectionMethod: {
        maxlength: 'Inspection Method must not be more than 50 characters.'
      }
    },
    monitorItems: {
      fmrLogPageMon: {
        maxlength: 'FMR/Logpage/Mon must not be more than 25 characters.'
      }
    },
    dteComments: {
      maxlength: 'DTE Comments must not be more than 500 characters.'
    },
    updatedBy: {
      required: 'Updated By is required.',
      maxlength: 'Updated By must not be more than 50 characters.'
    },
    updatedDate: {
      required: 'Updated Date is required.',
      maxlength: 'Updated Date must not be more than 20 characters.'
    },
    dteDueDate: {
      required: 'Updated Date is required.',
      maxlength: 'Updated Date must not be more than 20 characters.'
    },
  }
};
