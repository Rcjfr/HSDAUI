import { TestBed, inject } from '@angular/core/testing';

import { DetectionMethodService } from './detection-method.service';

describe('DetectionMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetectionMethodService]
    });
  });

  it('should ...', inject([DetectionMethodService], (service: DetectionMethodService) => {
    expect(service).toBeTruthy();
  }));
});
