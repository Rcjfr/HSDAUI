import { TestBed, inject } from '@angular/core/testing';

import { AlertCodeService } from './alert-code.service';

describe('AlertCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertCodeService]
    });
  });

  it('should ...', inject([AlertCodeService], (service: AlertCodeService) => {
    expect(service).toBeTruthy();
  }));
});
