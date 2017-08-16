import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { IUser } from './../models/user.model';
import { Observable } from "rxjs/Rx";
import { AppStateService } from ".";
import { environment } from '../../../environments/environment';
import {  Router } from '@angular/router';

@Injectable()
export class AuthService {
  public currentUser$: Observable<IUser>;
  
  private endPointUrl = `${environment.hsdaApiBaseUrl}users`;
  constructor(private http: Http, private appStateService: AppStateService, private router: Router) {
    this.currentUser$ = this.appStateService.getUser().filter(u => !!u).map(u => u && u.toJS());
  }

  loadLoggedInUser(): Observable<IUser> {
    return this.http.get(this.endPointUrl)
      .map((result) => result.json());
  }
  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.map(u=>!!u);
  }
  requestOptions(): Observable<RequestOptionsArgs> {
    return this.accessToken().map(token => {
      let headers: Headers = new Headers();
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
    return this.currentUser$.map(u => u.roles.includes(role));
  }
  hasAnyRole(roles: string[]): Observable<boolean> {
    return this.currentUser$.map(u => u.roles.some((role) => { return roles.indexOf(role) > -1 }));
  }
  accessToken(): Observable<string> {
    return this.currentUser$.map(u => u.access_token);
  }
  logOut(): void {
    window.location.href = 'https://newjetnet.aa.com';
  }
}
