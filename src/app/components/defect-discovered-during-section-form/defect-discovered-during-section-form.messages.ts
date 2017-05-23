// Defines all of the validation messages for the form.

export const ValidationMessages: { [key: string]: { [key: string]: string } } = {
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
                required: 'Description is required for unscheduled maintenance.'
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
        };
