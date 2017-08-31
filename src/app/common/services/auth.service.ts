import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { IUser } from './../models/user.model';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from './app-state.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public currentUser$: Observable<IUser>;
  readonly QC_Inspector = 'QC_Inspector';
  readonly QC_Supervisor = 'QC_Supervisor';
  readonly QC_Manager = 'QC_Manager';
  readonly Reliability_Analyst = 'Reliability_Analyst';

  private endPointUrl = `${environment.hsdaApiBaseUrl}users`;
  constructor(private http: Http, private appStateService: AppStateService, private router: Router) {
    this.currentUser$ = this.appStateService.getUser().filter(u => !!u).map(u => u && u.toJS());
  }
  loadLoggedInUser(): Observable<IUser> {
    return this.http.get(this.endPointUrl)
      .map((result) => result.json());
  }
  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.map(u => !!u);
  }
  requestOptions(): Observable<RequestOptionsArgs> {
    return this.accessToken().map(token => {
      const headers = new Headers();
      let requestOptions: RequestOptionsArgs;
      headers.append('Authorization', 'Bearer ' + token);
      headers.append('Content-Type', 'application/json');
      requestOptions = { headers: headers };

      return requestOptions;
    });
  }
  displayName(): Observable<string> {
    return this.currentUser$.map(u => `${u.sm_user_lastname}, ${u.sm_user_firstname}`);
  }
  auditDisplayName(): Observable<string> {
    return this.currentUser$.map(u => `${u.sm_user} - ${u.sm_user_lastname}, ${u.sm_user_firstname}`);
  }
  email(): Observable<string> {
    return this.currentUser$.map(u => u.sm_user_email);
  }
  badgeId(): Observable<string> {
    return this.currentUser$.map(u => u.sm_user);
  }
  roles(): Observable<string[]> {
    return this.currentUser$.map(u => u.roles);
  }
  hasRole(role: string): Observable<boolean> {
    return this.currentUser$.map(u => u.roles.indexOf(role) > -1);
  }
  hasAnyRole(roles: string[]): Observable<boolean> {
    return this.currentUser$.map(u => u.roles.some((role) => { return roles.indexOf(role) > -1 }));
  }
  accessToken(): Observable<string> {
    return this.currentUser$.map(u => u.access_token);
  }
  logOutUrl(): string {
    return environment.logoutUrl;
  }

  isQCInspector(): Observable<boolean> {
    return this.hasRole(this.QC_Inspector);
  }
  isQCManager(): Observable<boolean> {
    return this.hasAnyRole([this.QC_Manager, this.QC_Supervisor]);
  }
  isReliabilityAnalyst(): Observable<boolean> {
    return this.hasRole(this.Reliability_Analyst);
  }
}
