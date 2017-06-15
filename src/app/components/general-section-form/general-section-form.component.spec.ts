import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { GeneralSectionFormComponent } from './general-section-form.component';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../common/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, TypeaheadMatch } from 'ngx-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Store } from '@ngrx/store';
import { MockStore } from '../../common/store/mock-store';
import { BaseFormComponent } from '../base-form.component';
import { MockComponent } from 'ng2-mock-component';

describe('GeneralSectionFormComponent', () => {
  let component: GeneralSectionFormComponent;
  let fixture: ComponentFixture<GeneralSectionFormComponent>;
  const mockResponse= [
                              {
                                'id': '32',
                                'primaryCode': 'Landing Gear',
                                'primaryCodeDescription': `Includes Basic Structure which provides major support
                                                for the aircraft, while on the ground,
                                                such as Struts, Linkage,Bolts, Latches, Attachment Fittings, etc.`,
                                'secondaryCode': '10',
                                'secondaryCodeDescription': 'Main Gear'
                                  }
                                ];

  beforeEach(async(() => {
     TestBed.configureTestingModule({
       providers: [AppStateService,
      {
        provide: Store, useValue: new MockStore({selectedAlert: {
          loading: false,
        noseNumbers: List.of(['A312', 'A330']),
         }})
      }],
      declarations: [ GeneralSectionFormComponent,MockComponent({}) ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule, FormsModule,
        HttpModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        FormsModule,
        // StoreModule.provideStore(reducer),
        ToastModule.forRoot()
      ]
    })

    .compileComponents();

  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSectionFormComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should get ATA Codes from service', ( ) => {
      const service: AppStateService = TestBed.get(AppStateService);
      spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
      fixture.detectChanges(); // move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
      component.ATACodes$.subscribe(a => {
            expect(a.count()).toBe(1);
      });

  });

});
