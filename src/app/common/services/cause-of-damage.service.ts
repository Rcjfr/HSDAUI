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
        { id: 0, description: 'Environment' },
        { id: 1, description: 'Lav / Galley Spill' },
        { id: 2, description: 'Blocked Drain' },
        { id: 4, description: 'Chemical Spill' },
        { id: 8, description: 'Wet Insulation Blanket' },
        { id: 16, description: 'Missing / Deteriorated Floorboard Tape' },
        { id: 32, description: 'Correct Hardware Not Installed' },
        { id: 64, description: 'Deteriorated / Poor Sealing Practices' },
        { id: 128, description: 'Missing Corrosion Inhibitor' },
        { id: 256, description: 'Other' }
    ]);
  };
}
