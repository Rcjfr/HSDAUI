import { TestBed, inject } from '@angular/core/testing';

import { CorrosionTypeService } from './corrosion-type.service';

describe('CorrosionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrosionTypeService]
    });
  });

  it('should ...', inject([CorrosionTypeService], (service: CorrosionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
