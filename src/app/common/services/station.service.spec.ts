import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { ATACodesService } from './ata-codes.service';
import { RouterModule } from '@angular/router';
import { StationService } from './station.service';

xdescribe('StationService', () => {
  let stationService: StationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StationService,
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule
      ]
    });
  });
  stationService = TestBed.get(StationService);
  httpMock = TestBed.get(HttpTestingController);

  describe('getStations', () => {
    xit('should return error if stations request failed', (done) => {
      stationService.getStations('D')
        .subscribe((res: any) => {
          expect(res.failure.error.type).toBe('ERROR_LOADING_STATIONS');
          done();
        });

      const stationsRequest = httpMock.expectOne('http://hsda.local.techops.aa.com/api/stations?query=D');
      stationsRequest.error(new ErrorEvent('ERROR_LOADING_STATIONS'));

      httpMock.verify();
    });
    xit('should return error if country request failed', (done) => {
      stationService.getStations('D')
        .subscribe((res: any) => {
          expect(res).toEqual(
            [{
              'stationIATACode': 'DFW',
              'stationDescription': 'Dallas'
            }]
          );
          done();
        });

      const stationsRequest = httpMock.expectOne('http://hsda.local.techops.aa.com/api/stations?query=D');
      stationsRequest.flush([{
        'stationIATACode': 'DFW',
        'stationDescription': 'Dallas'
      }]);
      httpMock.verify();
    });

  });
});
