import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ATACodesService } from './ata-codes.service';
import { RouterModule } from '@angular/router';
import { AircraftService } from './aircraft.service';

describe('AircraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AircraftService,
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

  it('should create', inject([AircraftService], (service: AircraftService) => {
    expect(service).toBeTruthy();
  }));
  describe('queryNoseNumbers', () => {
    it('should return an array of NoseNumbers', async(inject(
      [AircraftService, MockBackend], (service: AircraftService, mockBackend: MockBackend) => {
      const mockResponse = ['A319', 'A321', 'A330'];
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.queryNoseNumbers('A');

      result.subscribe(res => {
        expect(res.length).toEqual(3);
        expect(res.filter(s => s.indexOf('A') > -1).length).toEqual(3);
      });
    })));
  });
  describe('getAircraftInfo', () => {
    it('should return aircraft information by nose number', async(inject(
      [AircraftService, MockBackend], (service: AircraftService, mockBackend: MockBackend) => {
      const mockResponse = {
                              'aircraftNo': 'A330',
                              'cycles': 912,
                              'fleet': '912',
                              'manufacturer': 'Airbus',
                              'model': 'A-330-200',
                              'serialNo': '1441',
                              'totalShipTime': 5771
                            };
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getAircraftInfo('A330');

      result.subscribe(res => {
        expect(res).toBeTruthy();
        expect(res.manufacturer).toEqual('Airbus');
      });
    })));
  });
});
