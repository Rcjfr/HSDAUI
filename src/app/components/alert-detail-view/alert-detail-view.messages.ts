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
        'description': {
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
    'defectType': {
      required: 'Defect Type is required.',
      maxlength: 'Defect Type must not be more than 250 characters.'
    },
    'defectDescription': {
      required: 'Defect Description is required.',
      maxlength: 'Defect Description must not be more than 250 characters.'
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
      'stationLocation': {

        pattern: 'Station must be alphanumeric.',
        maxlength: 'Station must not be more than 50 characters.'
      },
      'stringer': {

        pattern: 'Stringer must be alphanumeric.',
        maxlength: 'Stringer must not be more than 25 characters.'
      },
      'wl': {

        pattern: 'WL must be alphanumeric.',
        maxlength: 'WL must not be more than 25 characters.'
      },
      'bl': {

        pattern: 'BL must be alphanumeric.',
        maxlength: 'BL must not be more than 25 characters.'
      }
    },
    'MFGpart': {

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
    'MFGserial': {

      pattern: 'MFG Serial # must be alphanumeric.',
      maxlength: 'MFG Serial # must not be more than 50 characters.'
    },
    'PartTT': {

      pattern: 'Part TT must be numeric.',
      maxlength: 'Part TT must not be more than 25 numbers.'
    },
    'PartTso': {

      pattern: 'Part TSO must be numeric.',
      maxlength: 'Part TSO must not be more than 25 numbers.'
    },
    'detected': {
      required: 'How Detected is required.'

    }
  },
  cpcpSectionGroup: {
    cpcprelated: {
      required: 'CPCP  is required.'
    },
    wsCorrosion: {
      required: 'Widespread Corrosion is required.'
    },
    corrosionLevel: {
      required: 'Corrosion level is required.'
    },
    previouslyBlended: {
      required: 'Corroded Area Previously Blended is required.'
    },
    corrosionTask: {
      required: 'Corrosion Task # required.',
      pattern: 'Corrosion Task # must be alphanumeric.',
      maxlength: 'Corrosion Task # must not be more than 25 numbers.'

    },
    corrosionType: {
      required: 'Type of Corrosion is required.'
    },
    corrosionTypeText: {
      required: 'Description is  required.',
      maxlength: 'Description must be not more than 250 numbers.'
    },
    floorbaordCondition: {
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
      'modifiedpartDescription': {
        required: 'Description is required.',
        maxlength: 'Description must not be more than 30 characters.',
        pattern: 'Description must be alphanumeric.'
      },
      'defectivePartDescription': {
        required: 'Description is required.',
        maxlength: 'Description must not be more than 30 characters.',
        pattern: 'Description must be alphanumeric.'
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
};
