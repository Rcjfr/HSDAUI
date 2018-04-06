import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as userActions from '@app/common/actions/logged-in-user';
import * as services from '@app/common/services';
import * as models from '@app/common/models';
import { catchError, switchMap, map, tap, delay } from 'rxjs/operators';
@Injectable()
export class UserEffects {

  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.LOAD_USER)
    .pipe(
    map((action: userActions.LoadUserAction) => action.payload),
    switchMap(() => {
      return this.authService.loadLoggedInUser()
        .pipe(
        map((user: models.IUser) => {
          return new userActions.LoadUserCompleteAction(user);
        }),
        catchError((err) => {
          return of(new userActions.LoadUserFailAction('Failed to load logged in user'));
        }));
    }));

  @Effect({ dispatch: false })
  logOut$ = this.actions$.ofType(userActions.ActionTypes.LOGOUT)
    .pipe(
    switchMap(() => this.authService.logOutUrl()),
    delay(1000),
    tap((url: string) => {
      this.toastr.warning('User session has timed out. Redirecting to login page...', 'Warning');
      location.href = url;
    })
    );

  @Effect()
  showToastrError$ = this.actions$
    .ofType(userActions.ActionTypes.LOAD_USER_FAIL)
    .pipe(
    map(toPayload),
    switchMap((payload: string) => {
      this.toastr.error(payload, 'ERROR');

      return of(new userActions.OperationFailedAction());
    }));
  constructor(private actions$: Actions,
    private authService: services.AuthService,
    private router: Router,
    private toastr: ToastrService) {
  }

}
