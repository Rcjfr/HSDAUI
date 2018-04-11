export interface IUser {
  sm_user: string;
  sm_timetoexpire: number;
  sm_user_firstname: string;
  sm_user_lastname: string;
  sm_user_email: string;
  sm_login_url: string;
  sm_logout_url: string;
  sm_session_expiry: Date;
  sm_session_timeout: number;
  sm_idle_threshold: number;
  sm_keepalive_interval: number;
  roles: string[];
  access_token: string;
}
