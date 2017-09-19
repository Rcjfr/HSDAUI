import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DetectionMethodService } from './detection-method.service';

describe('DetectionMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetectionMethodService,
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
      ]
    });
  });

  xit('should create', inject([DetectionMethodService], (service: DetectionMethodService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllDetectionMethods', () => {
    xit('should return All Departments', async(inject(
      [DetectionMethodService, MockBackend], (service: DetectionMethodService, mockBackend: MockBackend) => {
        const mockResponse = [{ id: 1, description: 'UNKNOWN' },
        { id: 2, description: 'TAP TEST' },
        { id: 3, description: 'BOROSCOPE' },
        { id: 4, description: 'FUNCTIONAL CHECK' },
        { id: 5, description: 'DYE PENETRANT' },
        { id: 6, description: 'EDDY CURRENT' },
        { id: 8, description: 'LIGHT SOURCE' },
        { id: 9, description: 'MAGNETIC PARTICLE' },
        { id: 10, description: 'OTHER' },
        { id: 11, description: 'THERMAL' },
        { id: 12, description: 'ULTRASONIC' },
        { id: 13, description: 'VISUAL' },
        { id: 14, description: 'MAGNIFIED VISUAL' },
        { id: 15, description: 'X-RAY' },
        { id: 16, description: 'DYE PENETRATION' },
        { id: 17, description: 'HFEC' }
        ];
        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
        });

        const result = service.getAllDetectionMethods();

        result.subscribe(res => {
          console.log('Response', res);
          expect(res.length).toEqual(16);
          expect(res[0].description).toEqual('UNKNOWN');
        });
      })));
  });
});