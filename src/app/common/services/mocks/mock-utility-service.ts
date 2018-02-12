import { Observable } from 'rxjs/Rx';
import { IYesNoBoth } from '@app/common/models/yes-no-both-options.model';

export class MockUtilityService {
  constructor() {
  }

  getYesNoBothOptions(): Observable<IYesNoBoth[]> {
    return Observable.of([
      { id: 1, description: 'Yes' },
      { id: 0, description: 'No' },
      { id: 2, description: 'Both' }
    ]);
  };
}
