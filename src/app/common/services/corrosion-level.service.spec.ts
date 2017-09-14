import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CorrosionLevelService } from './corrosion-level.service';

describe('CorrosionLevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrosionLevelService,
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

  xit('should create', inject([CorrosionLevelService], (service: CorrosionLevelService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllCorrosionLevels', () => {
    xit('should return All Corrosion Levels', async(inject(
      [CorrosionLevelService, MockBackend], (service: CorrosionLevelService, mockBackend: MockBackend) => {
        const mockResponse = [{ id: 2, description: '1' }, { id: 3, description: '2' }, { id: 4, description: '3' }];
        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
        });

        const result = service.getAllCorrosionLevels();

        result.subscribe(res => {
          expect(res.length).toEqual(3);
        });
      })));
  });
});