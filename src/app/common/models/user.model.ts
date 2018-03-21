export interface IUser {
  sm_user: string;
  sm_timetoexpire: number;
  sm_user_firstname: string;
  sm_user_lastname: string;
  sm_user_email: string;
  sm_logout_url: string;
  roles: string[];
  access_token: string;
}
