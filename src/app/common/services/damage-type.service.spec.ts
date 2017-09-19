import { TestBed, inject } from '@angular/core/testing';
import { DamageTypeService } from './damage-type.service';

describe('DamageTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DamageTypeService]
    });
  });

  xit('should ...', inject([DamageTypeService], (service: DamageTypeService) => {
    expect(service).toBeTruthy();
  }));
});
