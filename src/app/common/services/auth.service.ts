import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { IUser } from '@app/common/models/user.model';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from '@app/common/services/app-state.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  public currentUser$: Observable<IUser>;
  readonly HSDA_End_Users = 'HSDA_End_Users';
  readonly QC_Inspector = 'QC_Inspector';
  readonly Designated_Quality_Control = 'Designated_Quality_Control';
  readonly QC_Supervisor = 'QC_Supervisor';
  readonly QC_Manager = 'QC_Manager';
  readonly Reliability_Analyst = 'Reliability_Analyst';
  readonly CPCP_Trained_Reviewing_Engineer = 'CPCP_Trained_Reviewing_Engineer';
  readonly Compliance_Engineer = 'Compliance_Engineer';
  readonly Compliance_Engineering_Analyst = 'Compliance_Engineering_Analyst';
  readonly Compliance_Engineering_Manager = 'Compliance_Engineering_Manager';

  private endPointUrl = `${environment.hsdaApiBaseUrl}users?ts=${(new Date()).getTime()}`;
  // Using Http here so that the HttpClient Interceptor do not intercept this api call
  constructor(private http: Http, private appStateService: AppStateService, private router: Router, private toastr: ToastrService) {
    this.currentUser$ = this.appStateService.getUser().filter(u => !!u).map(u => u && u.toJS());
  }

  loadLoggedInUser(): Observable<IUser> {
    return this.http.get(this.endPointUrl)
      .map((result) => result.json())
      .catch(err => {
        if (err.status && err.status === 401) {
          this.toastr.warning('User session not found. Redirecting to login page...', 'Error');
          setTimeout(() => location.reload(true), 1000);

          return;
        }

        return Observable.throw(err);
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.map(u => !!u);
  }

  requestHeaders(): Observable<HttpHeaders> {
    return this.accessToken().map(token => {
      const headers = new HttpHeaders();
      headers.set('Authorization', 'Bearer ' + token);
      headers.set('Content-Type', 'application/json');

      return headers;
    });
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

  logOutUrl(): Observable<string> {
    return this.currentUser$.map(u => u.sm_logout_url);
  }

  isQCInspector(): Observable<boolean> {
    return Observable.combineLatest(this.isQCPersonnel(), this.isQCManager()).map(latestValues => {
      const [qcPersonnel, qcManager] = latestValues;

      return qcPersonnel && !qcManager;
    });
  }

  isQCManager(): Observable<boolean> {
    return this.hasAnyRole([this.QC_Manager, this.QC_Supervisor]);
  }

  isQCSupervisor(): Observable<boolean> {
    return this.hasAnyRole([this.QC_Supervisor]);
  }

  isQCPersonnel(): Observable<boolean> {
    return this.hasAnyRole([this.QC_Inspector, this.Designated_Quality_Control, this.QC_Manager, this.QC_Supervisor]);
  }

  isReliabilityAnalyst(): Observable<boolean> {
    return this.hasRole(this.Reliability_Analyst);
  }

  isCPCPTrainedReviewingEngineer(): Observable<boolean> {
    return this.hasRole(this.CPCP_Trained_Reviewing_Engineer);
  }

  isComplianceEngineer(): Observable<boolean> {
    return this.hasAnyRole([this.Compliance_Engineer, this.Compliance_Engineering_Analyst, this.Compliance_Engineering_Manager]);
  }
}
