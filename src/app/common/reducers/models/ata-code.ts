import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IATACode} from '../../models/ata-code.model';
export interface ATACodeRecord extends TypedRecord<ATACodeRecord>, IATACode { }
export const ATACodeFactory = makeTypedFactory<IATACode, ATACodeRecord>({
      id: 0,
    primaryCode: '',
    primaryCodeDescription: '',
    secondaryCode: '',
    secondaryCodeDescription: ''
});



