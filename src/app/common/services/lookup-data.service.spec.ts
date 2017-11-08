import { TestBed, inject } from '@angular/core/testing';

import { LookupDataService } from './lookup-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('LookupDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupDataService],
imports: [
        HttpClientTestingModule
]
    });
  });

  it('should ...', inject([LookupDataService], (service: LookupDataService) => {
    expect(service).toBeTruthy();
  }));
});
