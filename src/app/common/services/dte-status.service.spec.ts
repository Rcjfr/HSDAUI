import { TestBed, inject } from '@angular/core/testing';

import { DteStatusService } from './dte-status.service';

describe('DteStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DteStatusService]
    });
  });

  it('should ...', inject([DteStatusService], (service: DteStatusService) => {
    expect(service).toBeTruthy();
  }));
});
