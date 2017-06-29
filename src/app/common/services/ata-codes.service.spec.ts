import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ATACodesService } from './ata-codes.service';
import { RouterModule } from '@angular/router';

describe('ATA Codes Service (Mocked)', () => {
  const mockResponse = [
                         {id: 79, primaryCode: '32', primaryCodeDescription: 'LANDING GEAR', secondaryCode: '00', secondaryCodeDescription: 'GENERAL'},
                         {id: 40, primaryCode: '32', primaryCodeDescription: 'LANDING GEAR', secondaryCode: '10', secondaryCodeDescription: 'MAIN GEAR'}
                        ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ATACodesService,
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
    [ATACodesService, MockBackend], (service: ATACodesService, mockBackend: MockBackend) => {

    expect(service).toBeDefined();
  })));

  describe('getATACodes', () => {
    it('should return all ATACodes', async(inject(
      [ATACodesService, MockBackend], (service: ATACodesService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getATACodes();

      result.subscribe(res => {
         console.log('Response:', res);
        expect(res.length).toEqual(2);
        
        console.log('code:', res[0].primaryCode);
        expect(res[0].primaryCode).toEqual('32');
      });
    })));
  });
});
