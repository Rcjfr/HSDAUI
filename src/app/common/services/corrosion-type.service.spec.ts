import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CorrosionTypeService } from './corrosion-type.service';

describe('CorrosionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrosionTypeService,
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

  it('should create', inject([CorrosionTypeService], (service: CorrosionTypeService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllCorrosionTypes', () => {
    it('should return All Corrosion Types', async(inject(
      [CorrosionTypeService, MockBackend], (service: CorrosionTypeService, mockBackend: MockBackend) => {
      const mockResponse = [
                      {id: 1, description: 'Exfoliation'}, 
                      {id: 2, description: 'Filiform'},
                      {id: 3, description: 'Galvanic'},
                      {id: 4, description: 'Intergranular'},
                      {id: 5, description: 'Other'}];
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getAllCorrosionTypes();

      result.subscribe(res => {
        expect(res.length).toEqual(5);
        expect(res[0].description).toEqual('Exfoliation');
      });
    })));
  });
});
