import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IStation} from '@app/common/models/station.model';

export interface IStationRecord extends TypedRecord<IStationRecord>, IStation { }

export const StationRecordFactory = makeTypedFactory<IStation, IStationRecord>({
      stationID: 0,
      stationIATACode: '',
      stationDescription: ''
});
