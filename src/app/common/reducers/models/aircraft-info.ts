import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { IAircraftInfo } from '@app/common/models/aircraft-info.model';
export interface AircraftInfoRecord extends TypedRecord<AircraftInfoRecord>, IAircraftInfo { }
export const aircraftInfoFactory = makeTypedFactory<IAircraftInfo, AircraftInfoRecord>({
    noseNumber: undefined,
    manufacturer: undefined,
    model: undefined,
    serialNo: undefined,
    totalShipTime: undefined,
    cycles: undefined,
    fleet: undefined,

});
