import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ATACodesService } from './ata-codes.service';
import { RouterModule } from '@angular/router';

describe('ATA Codes Service (Mocked)', () => {
  const mockResponse = [
                              {
                                'Code': '32',
                                'Name': 'Landing Gear',
                                'Description': `Includes Basic Structure which provides major support 
                                                for the aircraft, while on the ground, 
                                                such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
                                'SecondaryCodes': [
                                  {
                                    'Code': '10',
                                    'Name': 'Main Gear'
                                  },
                                  {
                                    'Code': '20',
                                    'Name': 'Nose Gear'
                                  }
                                ]
                              }];

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
    it('should return an array of ATACodes', async(inject(
      [ATACodesService, MockBackend], (service: ATACodesService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getATACodes();

      result.subscribe(res => {
        // console.log('Response:', res);
        expect(res.length).toEqual(1);
        expect(res[0].Code).toEqual('32');
        expect(res[0].SecondaryCodes.length).toEqual(2);
      });
    })));
  });
});
