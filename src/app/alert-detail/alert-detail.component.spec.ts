import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { AlertDetailComponent } from './alert-detail.component';
import { CheckboxComponent } from '../common/directives/checkbox/checkbox.component';
import { ATACodesService } from '../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../common/reducers/index';
import { Store } from '@ngrx/store';
import * as fromRoot from '../common/reducers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('AlertDetailComponent', () => {
  let component: AlertDetailComponent;
  let fixture: ComponentFixture<AlertDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ATACodesService],
      declarations: [AlertDetailComponent, CheckboxComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        FormsModule,
        HttpModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        StoreModule.provideStore(reducer),
      ]
    })
      .compileComponents();
    // http://stackoverflow.com/questions/40021366/angular2-mocking-service-in-a-component-mock-ignored
    // TestBed.overrideComponent(AlertDetailComponent, {
    //   set: {
    //     providers: [
    //       { provide: ATACodesService, useClass: MockATACodesService },
    //     ]
    //   }
    // });
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(AlertDetailComponent);
      component = fixture.componentInstance;
    });
  it('should create', () => {
      expect(component).toBeTruthy();
    });

  it('should get ATA Codes from service', ( ) => {
      const service: ATACodesService = TestBed.get(ATACodesService);
      const mockResponse = [
                              {
                                'Code': '32 - Landing Gear',
                                'Description': `Includes Basic Structure which provides major support 
                                                                        for the aircraft, while on the ground, 
                                                                        such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
                                'Codes': [
                                  {
                                    'Code': '10 Main Gear'
                                  },
                                  {
                                    'Code': '20 Nose Gear'
                                  }
                                ]
                              }
                            ];
      spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      fixture.detectChanges(); //move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
      component.ataCode1s$.subscribe(a => {
            expect(a.length).toBe(1);
      });
  });
  it('should get ATA Codes 2 based on ATA Code 1', ( ) => {
      const service: ATACodesService = TestBed.get(ATACodesService);
      const mockResponse = [
                              {
                                'Code': '32 - Landing Gear',
                                'Description': `Includes Basic Structure which provides major support 
                                                                        for the aircraft, while on the ground, 
                                                                        such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
                                'Codes': [
                                  {
                                    'Code': '10 Main Gear'
                                  },
                                  {
                                    'Code': '20 Nose Gear'
                                  }
                                ]
                              }
                            ];
      spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      fixture.detectChanges(); //move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
      component.getAlertCode2s('32 - Landing Gear');
      component.ataCode2s$.subscribe(a => {
            expect(a.length).toBe(2);
      });
  });
});

