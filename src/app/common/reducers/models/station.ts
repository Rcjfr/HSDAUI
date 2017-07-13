import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IStation} from '../../models/station.model';

export interface IStationRecord extends TypedRecord<IStationRecord>, IStation { }

export const ATACodeFactory = makeTypedFactory<IStation, IStationRecord>({
      stationID: 0,
      stationIATACode: '',
      stationDescription: ''
});