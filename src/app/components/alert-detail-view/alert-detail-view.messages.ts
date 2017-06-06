﻿// Defines all of the validation messages for the form.

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
        maxlength: 'Aircraft # can not be more than 5 characters.'
      },
      'manufacturer': {
        required: 'Manufacturer is required.',
        pattern: 'Manufacturer must be alphanumeric.',
        maxlength: 'Manufacturer can not be more than 100 characters.'
      },
      'model': {
        required: 'Aircraft Model/Series is required.',
        pattern: 'Aircraft Model/Series must be alphanumeric.',
        maxlength: 'Aircraft Model/Series can not be more than 15 characters.'
      },
      'serialNo': {
        required: 'Serial # is required.',
        pattern: 'Serial # must be alphanumeric.',
        maxlength: 'Serial # can not be more than 10 characters.'
      },
      'totalShipTime': {
        required: 'Total Ship Time is required.',
        pattern: 'Total Ship Time must be numeric.',
        maxlength: 'Total Ship Time can not be more that 25 numbers.'
      },
      'cycles': {
        required: 'Cycles is required.',
        pattern: 'Cycles must be numeric.',
        maxlength: 'Cycles can not be more that 25 numbers.'
      },
      'fleet': {
          required: 'Fleet is required.',
          maxlength: 'Fleet can not be more that 20 characters.'
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
          pattern: 'Routine # must contain only alphanumerics.'
        },
        'nonRoutineNo': {
          pattern: 'Non Routine # must contain only alphanumerics.'
        }
      },
      'unscheduledMaintenanceGroup': {
        atleastone: 'Non-Routine # or MIC # is required.',
        'description': {
          required: 'Description is required for unscheduled maintenance.'
        },
        'nonRoutineNo': {
          pattern: 'Non Routine # must contain only alphanumerics.'
        },
        'micNo': {
          pattern: 'MIC # must contain only alphanumerics.'
        }
      }
    }
  },
  defectLocationSectionFormGroup: {
    'defectType': {
      required: 'Defect Type is required.',
      maxlength: 'Defect Type must be not more than 250 characters.'
    },
    'defectDescription': {
      required: 'Defect Description is required.',
      maxlength: 'Defect Description must be not more than 250 characters.'
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
        maxlength: 'Station must not be more than 25 characters.'
      },
      'stringer': {

        pattern: 'Stringer must be alphanumeric.',
        maxlength: 'Stringer must not be more than 25 characters.'
      },
      'wl': {

        pattern: 'wl must be alphanumeric.',
        maxlength: 'wl must not be more than 25 characters.'
      },
      'bl': {

        pattern: 'bl must be alphanumeric.',
        maxlength: 'bl must not be more than 25 characters.'
      }
    },
    'MFGpart': {

      pattern: 'MFG Part must be alphanumeric.',
      maxlength: 'MFG Part must not be more than 50 characters.'
    }
    ,
    'partDefective': {
      required: 'Part Defective is required.',
      maxlength: 'Part Defective must not be more than 50 characters.',
      pattern: 'Part Defective must be alphanumeric.'
    }
    ,
    'MFGserial': {

      pattern: 'MFG Serial must be alphanumeric.',
      maxlength: 'MFG Serial must not be more than 50 characters.'
    },
    'PartTT': {

      pattern: 'Part TT must be numeric.',
      maxlength: 'Part TT must be not more that 25 numbers.'
    },
    'PartTso': {

      pattern: 'Part TSO must be numeric.',
      maxlength: 'Part TSO must be not more that 25 numbers.'
    },
    'detected': {
      required: 'How Detected is required.'

    }
  },
  cpcpSectionGroup: {
    cpcprelated: {
      required: ' CPCP  is required.'
    },
    wsCorrosion: {
      required: ' Widespread Corrosion is required.'
    },
    corrosionLevel: {
      required: ' Corresion level is required.'
    },
    previouslyBlended: {
      required: ' Corroded Area Previously Blended  required.'
    },
    corrosionTask: {
      required: ' Corrosion Task required.',
      pattern: 'Corrosion Task must be alphanumeric.',
      maxlength: 'Corrosion Task must be not more that 25 numbers.'
      
    },
    corrosionType: {
      required: ' Type of Corrosion  required.'
    },
    corrosionTypeText: {
        required: ' Description is  required.',
        maxlength: 'Description must be not more that 250 numbers.'
    },
    floorbaordCondition: {
      //  required: ' Floorboard condition after mat is removed is  required.',
    },
    causeOfDamageGroup: {
      atleastone:
    'atleast one should be selected',


    'damageOther': {

        required: 'damageOther must be alphanumeric.',

    }
  },
  },
  
  'deferredSectionFormGroup': {
      'deferredSectionOptions': {
          
      },
  'correctiveActionFormGroup': {
      
      'deferralCode': {
          required: 'deferralCode during is required.',
          pattern: 'deferralCode must contain only alphabet characters.',
          maxlength: 'deferralCode must be not more that 3 characters.'
      },
      'deferral': {
          required: 'deferral during is required.',
          pattern: 'deferral must must be alphanumeric..',
          maxlength: 'deferral must be not more that 15 characters.'
      },
      'repairDescription': {
          
          maxlength: 'repairDescription must be not more that 250 characters.'
      }
      },
  }
      
  
};
