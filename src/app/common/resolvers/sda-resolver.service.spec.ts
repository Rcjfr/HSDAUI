import { TestBed, inject } from '@angular/core/testing';

import { SdaResolverService } from './sda-resolver.service';

describe('SdaResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SdaResolverService]
    });
  });

  xit('should ...', inject([SdaResolverService], (service: SdaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
