import { TestBed, inject } from '@angular/core/testing';

import { ReasonForChangeService } from './reason-for-change.service';

describe('ReasonForChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReasonForChangeService]
    });
  });

  it('should ...', inject([ReasonForChangeService], (service: ReasonForChangeService) => {
    expect(service).toBeTruthy();
  }));
});
