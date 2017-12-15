import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '@app/common/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.accessToken().flatMap(token => {

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(authReq)
        .do((event) => {
          if (event instanceof HttpResponse) {
            //Checking for 200 and empty body because SiteMinder is blocking the POST request
            if (event.status === 302 || (event.status === 200 && !event.body)) {
              this.toastr.warning('User session has timed out. Redirecting to login page...', 'Warning');
              setTimeout(() => location.reload(true), 1000);

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
            if (err.status === 0) {
              this.toastr.warning('User session has timed out. Redirecting to login page...', 'Warning');
              setTimeout(() => location.reload(true), 1000);

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
