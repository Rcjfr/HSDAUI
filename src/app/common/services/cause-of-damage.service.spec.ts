import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CauseOfDamageService } from './cause-of-damage.service';

describe('CauseOfDamageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CauseOfDamageService,
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
    it('should create', inject([CauseOfDamageService], (service: CauseOfDamageService) => {
        expect(service).toBeTruthy();
    }));

    describe('getAllCauseOfDamages', () => {
        it('should return All Cause Of Damages', async(inject(
            [CauseOfDamageService, MockBackend], (service: CauseOfDamageService, mockBackend: MockBackend) => {
                //const mockResponse = [{ id: 2, description: "1" }, { id: 3, description: "2" }, { id: 4, description: "3" }];
                //mockBackend.connections.subscribe(conn => {
                //    conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
                //});

                const result = service.getAllCauseOfDamages();

                result.subscribe(res => {
                    expect(res.length).toEqual(10);
                });
            })));
    });
});