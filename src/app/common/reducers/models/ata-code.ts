import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IATACode} from '../../models/ata-code.model';

export interface ATACodeRecord extends TypedRecord<ATACodeRecord>, IATACode { }

export const ATACodeFactory = makeTypedFactory<IATACode, ATACodeRecord>({
    primaryId: 0,
    primaryCode: '',
    primaryCodeDescription: '',
    secondaryId:0,
    secondaryCode: '',
    secondaryCodeDescription: ''
});