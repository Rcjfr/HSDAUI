import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ATACodesService } from './ata-codes.service';
import { RouterModule } from '@angular/router';
import { StationService } from './station.service';

describe('StationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StationService,
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

  it('should create', inject([StationService], (service: StationService) => {
    expect(service).toBeTruthy();
  }));
  describe('getAllStations', () => {
    it('should return all stations available', async(inject(
      [StationService, MockBackend], (service: StationService, mockBackend: MockBackend) => {
      const mockResponse =[ {
        stationID: 1,
        stationIATACode: 'ABQ',
        stationDescription:'Albuquerque, NM'
      }
        ];
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getAllStations();

      result.subscribe(res => {
        expect(res).toBeTruthy();
        expect(res.length).toEqual(1);
        expect(res[0].stationIATACode).toEqual('ABQ');
      });
    })));
  });
});
