import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad
} from '@angular/router';

import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService,
    private router: Router, private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    if (id && id === 'new') {
      return this.authService.isQCInspector().take(1).map(hasRole => {
        if (!hasRole) {
          console.log('Unauthorized');
          //alert('Unauthorized');
          this.toastr.success('Only QC Inspectors can create new SDA.', 'Unauthorized');
        }

        return hasRole;
      });
    }

    return this.checkLoggedIn(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): Observable<boolean> {
    return this.authService.isAuthenticated();
  }
}
