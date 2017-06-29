import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICauseOfDamage } from '../models/cause-of-damage.model';
import '../rxjs-extensions';

@Injectable()
export class CauseOfDamageService {

    private endPointUrl = `${environment.hsdaApiBaseUrl}causeofdamages`;
  constructor(private http: Http) { }

  getAllCauseOfDamages(): Observable<ICauseOfDamage[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
    return Observable.of([
        { id: 1, description: 'Environment' },
        { id: 2, description: 'Lav / Galley Spill' },
        { id: 3, description: 'Blocked Drain' },
        { id: 4, description: 'Chemical Spill' },
        { id: 5, description: 'Wet Insulation Blanket' },
        { id: 6, description: 'Missing / Deteriorated Floorboard Tape' },
        { id: 7, description: 'Correct Hardware Not Installed' },
        { id: 8, description: 'Deteriorated / Poor Sealing Practices' },
        { id: 9, description: 'Missing Corrosion Inhibitor' },
        { id: 10, description: 'Other' }
    ]);
  };
}
