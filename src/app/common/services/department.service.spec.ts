import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentService,
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

  it('should create', inject([DepartmentService], (service: DepartmentService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllDepartments', () => {
    it('should return All Departments', async(inject(
      [DepartmentService, MockBackend], (service: DepartmentService, mockBackend: MockBackend) => {
      const mockResponse = [{id: 1, description: "Engineering"}, {id: 2, description: "Inspection"},{id: 3, description: "Other"}];
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getAllDepartments();

      result.subscribe(res => {
        console.log("Response",res);
        expect(res.length).toEqual(3);
        expect(res[0].description).toEqual("Engineering");
      });
    })));
  });

});
