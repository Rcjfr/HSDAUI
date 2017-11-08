import { async, TestBed, inject } from '@angular/core/testing';

import { CheckTypesService } from './check-types.service';

import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterModule } from '@angular/router';

describe('CheckTypes Service (Mocked)', () => {
  const mockResponse = [
                                    {
                                      'Fleet': 'A319',
                                      'CheckTypes': [
                                          {id: 1, description: '2C Interval'},
                                          {id: 2, description: 'A CHECK'},
                                          {id: 3, description: 'A Check'}
                                      ]
                                    }
                        ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckTypesService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule,
        RouterModule
      ]
    });
  });

  xit('should construct', async(inject(
    [CheckTypesService, MockBackend], (service: CheckTypesService, mockBackend: MockBackend) => {

    expect(service).toBeDefined();
  })));

});

