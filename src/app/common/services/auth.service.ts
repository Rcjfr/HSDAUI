import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { IUser } from '@app/common/models/user.model';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from '@app/common/services/app-state.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import swal from 'sweetalert2';

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
  public hasSessionTimedOut = false;
  private endPointUrl = `${environment.hsdaApiBaseUrl}users?ts=${(new Date()).getTime()}`;
  // Using Http here so that the HttpClient Interceptor do not intercept this api call
  constructor(private http: Http, private appStateService: AppStateService,
    private router: Router, private toastr: ToastrService,
    private idle: Idle, private keepalive: Keepalive
  ) {
    this.currentUser$ = this.appStateService.getUser()
      .filter(u => !!u)
      .map(u => u && u.toJS());
  }
  setupIdleTimer() {
    // https://hackedbychinese.github.io/ng2-idle/
    this.idle.setIdle((environment.sessionTimeOut - 1) * 60); // after 14 minutes of inactivity, idle timer starts
    this.idle.setTimeout(60); // timeout dialogue shown for 1 minute before redirecting to SM Login
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onTimeout.subscribe(() => {
      console.log('User session timed out.');
      swal.close();
      this.hasSessionTimedOut = true;
      this.toastr.warning('User session timed out. Redirecting to login page...', 'Error');
      this.logOutUrl().delay(1000).subscribe(url => location.href = url);
    });
    this.idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle.');
      swal.close();
    });
    this.idle.onIdleStart.subscribe(() => console.log('You\'ve gone idle!'));
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log('You will time out in ' + countdown + ' seconds!');
      if (!swal.isVisible()) {
        swal({
          title: 'Session Expiring',
          html: '<h3>Your session is about to expire.Click button below to extend your session.</h3>',
          type: 'warning',
          width: '100%',
          confirmButtonText: 'Extend my session'
        });
      }
    });
    this.keepalive.interval(2 * environment.sessionTimeOut / 3 * 60); //if user is active, keep the siteminder session alive for every 10 minutes
    this.keepalive.request(this.endPointUrl); // access api/users so that the siteminder session gets extended on server as well
    this.keepalive.onPingResponse.subscribe((renewedUserSession) => console.log('Session extended ', new Date(), renewedUserSession));
    this.idle.watch();
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
  timeToExpire(): Observable<number> {
    return this.currentUser$.map(u => u.sm_timetoexpire);
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
