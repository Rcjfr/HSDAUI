import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { IAircraftInfo } from '@app/common/models/aircraft-info.model';
export interface IAircraftInfoRecord extends TypedRecord<IAircraftInfoRecord>, IAircraftInfo {  }
export const AircraftInfoFactory = makeTypedFactory<IAircraftInfo, IAircraftInfoRecord>({
  noseNumber: undefined,
  registrationNumber: undefined,
  manufacturer: undefined,
  model: undefined,
  serialNo: undefined,
  totalShipTime: undefined,
  cycles: undefined,
  fleet: undefined,

});
