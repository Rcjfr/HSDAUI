import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {IUser} from '../../models/user.model';

export interface IUserRecord extends TypedRecord<IUserRecord>, IUser { }

export const UserRecordFactory = makeTypedFactory<IUser, IUserRecord>({
  sm_user: '',
  sm_user_email: '',
  sm_user_firstname: '',
  sm_user_lastname: '',
  access_token: '',
  roles:[]
});