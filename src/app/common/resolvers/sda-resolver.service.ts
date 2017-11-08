import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AppStateService } from '@app/common/services';
import { ISda } from '@app/common/models';

@Injectable()
export class SdaResolverService implements Resolve<ISda> {

  constructor(private appStateService: AppStateService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISda> {
    const id = route.params['id'];
    let sdaId = 0;
    if (id !== 'new') { sdaId = +id; }
    this.appStateService.loadSda(sdaId);

    return this.appStateService.getSelectedSda().filter(s => s.id === sdaId).take(1).map(d => d.toJS());
  }
}
