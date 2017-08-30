import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as userActions from '../actions/logged-in-user';
import * as services from '../services';
import * as models from '../models';
import '../rxjs-extensions';
@Injectable()
export class UserEffects {

  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.LOAD_USER)
    .map((action: userActions.LoadUserAction) => action.payload)
    .switchMap(() => {
      return this.authService.loadLoggedInUser()
        .map((user: models.IUser) => {
          return new userActions.LoadUserCompleteAction(user);
        })
        .catch((err) => {
          return of(new userActions.LoadUserFailAction('Failed to load logged in user'));
        });
    });
  @Effect({ dispatch: false })
  showToastrError$: any = this.actions$
    .ofType(userActions.ActionTypes.LOAD_USER_FAIL)
    .map((action: Action) => {
      this.toastr.error(<string>action.payload, 'ERROR');

      return action;
    })
    .delay(1000)
    .map((action: Action) => {
      this.router.navigateByUrl('https://newjetnet.aa.com');
      return null;
    });
  constructor(private actions$: Actions,
    private authService: services.AuthService,
    private router: Router,
    private toastr: ToastrService) {
  }

}
