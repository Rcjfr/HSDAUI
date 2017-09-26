import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { IUser } from "./../models";
describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
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

  xit('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  xdescribe('loadLoggedInUser', () => {
    xit('should load loggedIn user details', async(inject(
      [AuthService, MockBackend], (service: AuthService, mockBackend: MockBackend) => {
        const mockResponse = {
          sm_user: '00123456',
          sm_user_firstname: 'FirstName',
          sm_user_lastname: 'LastName',
          sm_user_email: 'firstname.lastname@aa.com',
          roles: ['QC_Inspector'],
          access_token: 'xxxxxxxx'
        };
        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
        });

        const result = service.loadLoggedInUser();

        result.subscribe((res: IUser) => {
          expect(res).toBeTruthy();
          expect(res.sm_user).toEqual('00123456');
          expect(res.roles[0]).toEqual('QC_Inspector');
        });
      })));
  });
});
