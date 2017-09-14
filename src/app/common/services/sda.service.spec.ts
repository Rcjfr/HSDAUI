import { TestBed, inject } from '@angular/core/testing';

import { SdaService } from './sda.service';

describe('SdaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SdaService]
    });
  });

  xit('should ...', inject([SdaService], (service: SdaService) => {
    expect(service).toBeTruthy();
  }));
});
