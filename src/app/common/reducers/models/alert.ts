﻿import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {Alert} from '../../models/alert.model';
export interface AlertRecord extends TypedRecord<AlertRecord>, Alert { }
export const alertFactory = makeTypedFactory<Alert, AlertRecord>({
    sdaId: '',
    sdrNumber: '',
    createDate: new Date(),
    lineMaintenance: false,
    alertCode: '',
    ataCode1: '',
    ataCode2: '',
    aircraftNo: '',
    station: '',
    department: '',
    manufacturer: '',
    model: '',
    serialNo: '',
    totalShipTime: '',
    cycles: '',
    fleet: '',
    scheduledMaintenance: null,
    nonRoutineNo: '',
    micNo: '',
    checkType: '',
    routineNo: '',
    unscheduledDescription: ''
});



