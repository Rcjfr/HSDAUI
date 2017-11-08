import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISavedState } from '@app/common/models';

export interface SavedStateRecord extends TypedRecord<SavedStateRecord>, ISavedState { }

export const SavedStateFactory = makeTypedFactory<ISavedState, SavedStateRecord>({
  sdaId: 0,
  newSda: false,
  Timestamp: new Date()
});
