import { async, TestBed, inject } from '@angular/core/testing';

import { CheckTypesService } from './check-types.service';

import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterModule } from '@angular/router';

describe('CheckTypes Service (Mocked)', () => {
  const mockResponse = [
                                    {
                                      "Fleet": "A319",
                                      "CheckTypes": [
                                        {
                                          "Name": "T,SC"
                                  
                                        },
                                        {
                                          "Name": "A Check"
                                        },
                                        {
                                          "Name": "P Check"
                                        },
                                        {
                                          "Name": "C Check(CC)"
                                        }
                                      ]
                                  
                                    }];

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

  it('should construct', async(inject(
    [CheckTypesService, MockBackend], (service: CheckTypesService, mockBackend: MockBackend) => {

    expect(service).toBeDefined();
  })));

  describe('getATACodes', () => {
    it('should return an array of ATACodes', async(inject(
      [CheckTypesService, MockBackend], (service: CheckTypesService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getCheckTypes();

      result.subscribe(res => {
        expect(res.length).toEqual(1);
        expect(res[0].Fleet).toEqual('A319');
        expect(res[0].CheckTypes.length).toEqual(4);
      });
    })));
  });
});

