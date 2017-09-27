import { Injectable } from '@angular/core';
import '../rxjs-extensions';
import { IYesNoBoth } from '../models/yes-no-both-options.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilityService {
  constructor() { }

  getYesNoBothOptions(): Observable<IYesNoBoth[]> {
    return Observable.of([
      { id: 1, description: 'Yes' },
      { id: 0, description: 'No' },
      { id: 2, description: 'Both' }
    ]);
  };


}
