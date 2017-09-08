import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICauseOfDamage } from '../models/cause-of-damage.model';
import '../rxjs-extensions';

@Injectable()
export class CauseOfDamageService {

    private endPointUrl = `${environment.hsdaApiBaseUrl}causeofdamages`;
    constructor(private http: HttpClient) { }

  getAllCauseOfDamages(): Observable<ICauseOfDamage[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
      return Observable.of([
        { id: 1, description: 'Environment' },
        { id: 2, description: 'Lav / Galley Spill' },
        { id: 4, description: 'Blocked Drain' },
        { id: 8, description: 'Chemical Spill' },
        { id: 16, description: 'Wet Insulation Blanket' },
        { id: 32, description: 'Missing / Deteriorated Floorboard Tape' },
        { id: 64, description: 'Correct Hardware Not Installed' },
        { id: 128, description: 'Deteriorated / Poor Sealing Practices' },
        { id: 256, description: 'Missing Corrosion Inhibitor' },
        { id: 512, description: 'Other' }
    ]);
  };
}
