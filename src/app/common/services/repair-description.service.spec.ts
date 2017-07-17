import { TestBed, inject } from '@angular/core/testing';

import { RepairDescriptionTypeService } from './repair-description.service';

describe('RepairDescriptionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [RepairDescriptionTypeService]
    });
  });

  it('should ...', inject([RepairDescriptionTypeService], (service: RepairDescriptionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
