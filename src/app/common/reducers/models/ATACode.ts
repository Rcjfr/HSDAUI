import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {ATACode} from '../../models/ata-code.model';
export interface ATACodeRecord extends TypedRecord<ATACodeRecord>, ATACode { }
export const ATACodeFactory = makeTypedFactory<ATACode, ATACodeRecord>({
      Code: '',
      Description: '',
      Name: '',
});



