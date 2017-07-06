import { TestBed, inject } from '@angular/core/testing';

import { RepairInspectionStatusService } from './repair-inspection-status.service';

describe('RepairInspectionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairInspectionStatusService]
    });
  });

  it('should ...', inject([RepairInspectionStatusService], (service: RepairInspectionStatusService) => {
    expect(service).toBeTruthy();
  }));
});