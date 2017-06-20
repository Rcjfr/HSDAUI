import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IRepairedDescribe } from '../models/repaired-describe.model';
import '../rxjs-extensions';

@Injectable()
export class RepairedDescribeService {

    private endPointUrl = `${environment.hsdaApiBaseUrl}repaireddescribe`;
  constructor(private http: Http) { }

  getAllRepairedDescribe(): Observable<IRepairedDescribe[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
    return Observable.of([
        { id: 1, description: 'Bonded Repair' },
        { id: 2, description: 'Bore/Fastener Hole(s) Rework' },
        { id: 3, description: 'Complex Repair' },
        { id: 4, description: 'Doubler Repair, External' },
        { id: 5, description: 'Doubler Repair, Flush' },
        { id: 6, description: 'Doubler Repair, Internal' },
        { id: 7, description: 'Non-reinforcing, Repair' },
        { id: 8, description: 'Non-reinforcing-Supplemental Inspection-MINOR' },
        { id: 9, description: 'Part Replacement - Entire' },
        { id: 10, description: 'Replacement - Sub Assembly' },
        { id: 11, description: 'Refinish - Scribe Line' },
        { id: 12, description: 'Reinforcing - Modification' },
        { id: 13, description: 'Restore Bonded Material' },
        { id: 14, description: 'Splice Repair' },
        { id: 15, description: 'Plug Reinforcement ( Nested Angles)' },
        { id: 16, description: 'Plug-Fastener' },
        { id: 17, description: 'Other' }
    ]);
  };
}
