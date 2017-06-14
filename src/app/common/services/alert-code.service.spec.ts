import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { AlertCodeService } from './alert-code.service';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

describe('AlertCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertCodeService,
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

  it('should create', inject([AlertCodeService], (service: AlertCodeService) => {
    expect(service).toBeTruthy();
  }));
  


  describe('getAllAlertCodes', () => {
    it('should return list of Alert codes', async(inject(
      [AlertCodeService, MockBackend], (service: AlertCodeService, mockBackend: MockBackend) => {
      const mockResponse = [
        {'id': 1, 'code': "A", 'description': "A-Significant Structure Defect"},
        {'id': 2, 'code': "B", 'description': "B-Significant Structure Corrosion"},
        {'id': 3, 'code': "C", 'description': "C-Ground Damage"},
        {'id': 4, 'code': "D", 'description': "D-Other-Bird Strike, Lightning Strike, etc"}
      ];
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.getAllAlertCodes();

      result.subscribe(res => {
        expect(res).toBeTruthy();
        expect(res.length).toBeGreaterThanOrEqual(4);
        expect(res[0].code).toBe("A");
        console.log("response",res[0].code);
      });
    })));
  });

  });


