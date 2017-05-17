import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {AircraftInfo} from '../../models/aircraft-info.model';
export interface AircraftInfoRecord extends TypedRecord<AircraftInfoRecord>, AircraftInfo { }
export const aircraftInfoFactory = makeTypedFactory<AircraftInfo, AircraftInfoRecord>({
    aircraftNo: '',
    manufacturer: '',
    model: '',
    serialNo: '',
    totalShipTime: '',
    cycles: '',
    fleet: '',

});



