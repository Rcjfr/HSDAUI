import { Injectable } from '@angular/core';
import { IYesNoBoth } from '@app/common/models/yes-no-both-options.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilityService {
  constructor() { }

  getYesNoBothOptions(): Observable<IYesNoBoth[]> {
    return of([
      { id: 1, description: 'Yes' },
      { id: 0, description: 'No' },
      { id: 2, description: 'Both' }
    ]);
  };


}
