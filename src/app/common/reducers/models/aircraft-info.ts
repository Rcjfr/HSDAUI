import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IAircraftInfo} from '../../models/aircraft-info.model';
export interface AircraftInfoRecord extends TypedRecord<AircraftInfoRecord>, IAircraftInfo { }
export const aircraftInfoFactory = makeTypedFactory<IAircraftInfo, AircraftInfoRecord>({
    aircraftNo: '',
    manufacturer: '',
    model: '',
    serialNo: '',
    totalShipTime: '',
    cycles: '',
    fleet: '',

});