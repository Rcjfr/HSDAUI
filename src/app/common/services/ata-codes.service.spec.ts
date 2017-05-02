import { TestBed, inject } from '@angular/core/testing';

import { ATACodesService } from './ata-codes.service';

describe('AlertCodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATACodesService]
    });
  });

  it('should ...', inject([ATACodesService], (service: ATACodesService) => {
    expect(service).toBeTruthy();
  }));
});
