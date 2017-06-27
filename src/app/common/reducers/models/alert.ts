import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { IAlert } from '../../models/alert.model';
export interface AlertRecord extends TypedRecord<AlertRecord>, IAlert {  }
export const alertFactory = makeTypedFactory<IAlert, AlertRecord>({
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
  unscheduledDescription: '',
  defectType: '',
  defectDescription: '',
  length: '',
  width: '',
  depth: '',
  stationLocation: '',
  stringer: '',
  wl: '',
  bl: '',
  MFGpart: '',
  partDefective: '',
  MFGserial: '',
  PartTT: '',
  PartTso: '',
  detected: '',
  status: 0,
  statusText: 'Open'

});



