import { TestBed, inject } from '@angular/core/testing';

import { CorrosionLevelService } from './corrosion-level.service';

describe('CorrosionLevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrosionLevelService]
    });
  });

  it('should ...', inject([CorrosionLevelService], (service: CorrosionLevelService) => {
    expect(service).toBeTruthy();
  }));
});
