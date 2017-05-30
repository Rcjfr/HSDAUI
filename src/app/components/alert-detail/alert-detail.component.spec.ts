import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import * as $ from 'jquery';
import { AlertDetailComponent } from './alert-detail.component';
import { CheckboxComponent } from '../../common/directives/checkbox/checkbox.component';
import { ATACodesService } from '../../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, TypeaheadMatch } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../common/reducers/index';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../common/reducers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MockStore } from '../../common/store/mock-store';
import { List } from 'immutable';
import { alertFactory } from '../../common/reducers/models/alert';
import { aircraftInfoFactory } from '../../common/reducers/models/aircraftInfo';
import { CheckTypesService } from '../../common/services/check-types.service';
describe('AlertDetailComponent', () => {
  let component: AlertDetailComponent;
  let fixture: ComponentFixture<AlertDetailComponent>;
const mockResponse = [
                              {
                                'Code': '32',
                                'Name': 'Landing Gear',
                                'Description': `Includes Basic Structure which provides major support
                                                for the aircraft, while on the ground,
                                                such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
                                'SecondaryCodes': [
                                  {
                                    'Code': '10',
                                    'Name': 'Main Gear'
                                  },
                                  {
                                    'Code': '20',
                                    'Name': 'Nose Gear'
                                  }
                                ]
                              }];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ATACodesService, CheckTypesService,
      {
        provide: Store, useValue: new MockStore({selectedAlert: {
          loading: false,
    alert: alertFactory(),
    noseNumbers: List.of(['A312', 'A330']),
    aircraftInfo: aircraftInfoFactory()
        }})
      }],
      declarations: [AlertDetailComponent, CheckboxComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule, FormsModule,
        HttpModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        // StoreModule.provideStore(reducer),
        ToastModule.forRoot()
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
      spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      fixture.detectChanges(); // move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
      component.ataCodes$.subscribe(a => {
            expect(a.length).toBe(1);
      });
  });
  it('should get ATA Codes 2 based on ATA Code 1', ( ) => {
      const service: ATACodesService = TestBed.get(ATACodesService);
      spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      fixture.detectChanges(); // move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
      component.getAlertCode2s('32');
      component.ataCode2s$.subscribe(a => {
            expect(a.length).toBe(2);
      });
  });
  it('should get matching nosenumbers', ( ) => {
      const _store: any = TestBed.get(Store);
      _store.next({selectedAlert:{
          loading: false,
            alert: alertFactory(),
            noseNumbers: List.of(['A312', 'A330']),
            aircraftInfo: aircraftInfoFactory({aircraftNo:'A330',
            model: 'A330',
    manufacturer: 'Airbus',
    serialNo: '1234',
    totalShipTime: '123',
    cycles: '234',
    fleet: '330'})
                }});
      component.noseNumberOnSelect(new TypeaheadMatch(null, 'A330'));
      fixture.detectChanges();
      expect(component.alert.cycles).toEqual('234');
  });
});

