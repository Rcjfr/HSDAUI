import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISavedState } from '@app/common/models';

export interface ISavedStateRecord extends TypedRecord<ISavedStateRecord>, ISavedState { }

export const SavedStateFactory = makeTypedFactory<ISavedState, ISavedStateRecord>({
  sdaId: 0,
  newSda: false,
  Timestamp: new Date()
});
