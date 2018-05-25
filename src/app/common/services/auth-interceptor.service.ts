import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from '@app/common/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppStateService } from '@app/common/services/app-state.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {Helper} from '@app/common/helper';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private toastr: ToastrService,
    private appStateService: AppStateService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService: AuthService = this.injector.get(AuthService);

    return authService.accessToken().flatMap(token => {

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(authReq)
        .do((event) => {
          if (event instanceof HttpResponse) {
            //Checking for 200 and empty body because SiteMinder is blocking the POST request
            if (_.isString(event.body) && !Helper.IsJsonString(event.body)) {
              authService.hasSessionTimedOut = true;
              this.appStateService.logout();

              return;
            }
            if (event.status === 401) {
              this.toastr.error('User is unauthorized to perform the requested operation.', 'Unauthorized');

              return;
            }
          }
        }).catch(err => {
          // for some reason, the 302 is not being captured above.
          // so for now,just capturing status == 0
          // any suggestions?
          if (err instanceof HttpErrorResponse) {
            //"Unexpected token < in JSON at position 0"[this happens when SM redirects an AJAX call to SM login page]
            if (err.status === 302 || err.status === 200 || err.status === 0) {
              authService.hasSessionTimedOut = true;
              this.appStateService.logout();

              return;
            }
            if (err.status === 401) {
              this.toastr.error('User is unauthorized to perform the requested operation.', 'Unauthorized');

              return;
            }
          }

          return Observable.throw(err);
        })
        ;
    });
  }
}
