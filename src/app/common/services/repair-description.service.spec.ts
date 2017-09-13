import { TestBed, inject } from '@angular/core/testing';

import { RepairDescriptionService } from './repair-description.service';

describe('RepairDescriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairDescriptionService]
    });
  });

  xit('should ...', inject([RepairDescriptionService], (service: RepairDescriptionService) => {
    expect(service).toBeTruthy();
  }));
});
