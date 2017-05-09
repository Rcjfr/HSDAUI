import { TestBed, inject } from '@angular/core/testing';

import { CheckTypesService } from './check-types.service';

describe('CheckTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckTypesService]
    });
  });

  it('should ...', inject([CheckTypesService], (service: CheckTypesService) => {
    expect(service).toBeTruthy();
  }));
});
