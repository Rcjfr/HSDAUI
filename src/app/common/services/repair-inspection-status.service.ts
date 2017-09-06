import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs-extensions';
import { environment } from '../../../environments/environment';
import { IBaseLookUp } from '../models/base-lookup.model';

@Injectable()
export class RepairInspectionStatusService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}dteStatus`;
  constructor(private http: HttpClient) { }
  getAllRepairInspectionStatus(): Observable<IBaseLookUp[]> {
    return Observable.of([
      { id: 1, description: 'Pending DTE' },
      { id: 2, description: 'Permanent Repair - Existing Inspections Adequate - CAT A' },
      { id: 3, description: 'Permanent Repair - Supplement Inspections Required - CAT B' },
      { id: 4, description: 'TimeLimited Repair - CAT C' },
      { id: 5, description: 'Permanent Repair (Not DT Critical)' },
      { id: 6, description: 'Interim Repair (Not DT Critical)' },
      { id: 7, description: 'Time Limited Repair (Not DT Critical)' },
      { id: 8, description: 'Other' },
      { id: 9, description: 'Stage 1 Approval - DTE on-going' },
      { id: 10, description: 'Stage 2 Approval' },
      { id: 11, description: 'Evaluation to be Completed at Survey' },
      { id: 12, description: 'Non-Reinforcing' },
      { id: 13, description: 'Sceptre Tracked' },
      { id: 14, description: 'Safe Life Limit applies' },
      { id: 15, description: 'Reinforcing Modification' },
    ]);
  }


}
