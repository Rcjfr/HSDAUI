// Defines all of the validation messages for the form.

export const ValidationMessages: { [key: string]: { [key: string]: string } } = {
            sdrNumber: {
                pattern: 'SDR Number must be alphanumeric.'
            },
            createDate: {
                required: 'Create Date is required.'
            },
            alertCode: {
                required: 'Alert Code is required.'
            },
            station: {
                required: 'Station is required.',
                minlength: 'Station must be 3 characters.',
                pattern: 'Station must contain only alphabet characters.'
            },
            ataCode1: {
                required: 'ATA Code 1 is required.'
            },
            ataCode2: {
                required: 'ATA Code 2 is required.'
            },
            department: {
                required: 'Department is required.'
            },
            aircraftNo: {
                required: 'Aircraft # is required.',
                pattern: 'Aircraft # must be alphanumeric.'
            },
            manufacturer: {
                required: 'Manufacturer is required.',
                pattern: 'Manufacturer must be alphanumeric.'
            },
            model: {
                required: 'Aircraft Model/Series is required.',
                pattern: 'Aircraft Model/Series must be alphanumeric.'
            },
            serialNo: {
                required: 'Serial # is required.',
                pattern: 'Serial # must be alphanumeric.',
                maxlength: 'Serial # can not be more than 10 characters.'
            },
            totalShipTime: {
                required: 'Total Ship Time is required.',
                pattern: 'Total Ship Time must be numeric.'
            },
            cycles: {
                required: 'Cycles is required.',
                pattern: 'Cycles must be numeric.'
            },
            fleet: {
                required: 'Fleet is required.'
            },
            defectDiscoveredDuring: {
                required: 'Defect Discovered during is required.'
            },
            unscheduledMaintenanceGroup: {
                atleastone: 'Non-Routine # or MIC # is required.'
            },
            scheduledMaintenanceGroup: {
                atleastone: 'Routine # or Non-Routine # is required.'
            },
            'unscheduledMaintenanceGroup.description': {
                required:'Description is required for unscheduled maintenance.'
            },
            'unscheduledMaintenanceGroup.nonRoutineNo': {
                pattern: 'Non Routine # must contain only alphanumerics.'
            },
            'unscheduledMaintenanceGroup.micNo': {
                pattern: 'MIC # must contain only alphanumerics.'
            },
            'scheduledMaintenanceGroup.checkType': {
                required: 'Check Type is required.'
            },
            'scheduledMaintenanceGroup.routineNo': {
                pattern: 'Routine # must contain only alphanumerics.'
            },
            'scheduledMaintenanceGroup.nonRoutineNo': {
              pattern: 'Non Routine # must contain only alphanumerics.'
            },
            defectType: {
                required: 'Defect Type is required.',
                maxlength: 'Defect Type must be not more than 250 characters.'
            },
            defectDescription: {
                required: 'Defect Description is required.',
                maxlength: 'Defect Description must be not more than 250 characters.'
            },
            length: {
                required: 'Length  is required.',
                maxlength: 'Length must be 3X3.',
                pattern: 'Length can be till 3X3 and must be numeric .'
            },
            width: {
                required: 'Width is required.',
                maxlength: 'Width must be 3X3.',
                pattern: 'Width can be till 3X3 and must be numeric.'
            },
            depth: {
                required: 'Depth is required.',
                maxlength: 'Depth must be 3X4.',
                pattern: 'Depth can be till 3X3 and must be 3X4 and numeric.'
            },


            percisionLocationGroup: {
                aleasttwo: 'station or stringer or wl or bl  is required.'
            },

            'percisionLocationGroup.stationLocation': {

                pattern: 'station must be alphanumeric.',
                maxlength: 'station must not be more than 25 characters.'
            },
            'percisionLocationGroup.stringer': {

                pattern: 'stringer must be alphanumeric.',
                maxlength: 'stringer must not be more than 25 characters.'
            },
             'percisionLocationGroup.wl': {

                 pattern: 'wl must be alphanumeric.',
                 maxlength: 'wl must not be more than 25 characters.'
            },
             'percisionLocationGroup.bl': {

                 pattern: 'bl must be alphanumeric.',
                 maxlength: 'bl must not be more than 25 characters.'
            }
            ,
            MFGpart: {

                pattern: 'MFG Part must be alphanumeric.',
                maxlength: 'MFG Part must not be more than 50 characters.'
            }
            ,
            partDefective: {
                required: 'Part Defective is required.',
                maxlength: 'Part Defective must not be more than 50 characters.',
                pattern: 'Part Defective must be alphanumeric.'
            }
            ,
            MFGserial: {

                pattern: 'MFG Serial must be alphanumeric.',
                maxlength: 'MFG Serial must not be more than 50 characters.'
            },
            PartTT: {

                pattern: 'Part TT must be numeric.',
                maxlength: 'Part TT must be not more that 25 numbers.'
            },
            PartTso: {

                pattern: 'Part TSO must be numeric.',
                maxlength: 'Part TSO must be not more that 25 numbers.'
            },
            detected: {
                required: 'How Detected is required.'

            }
        };
