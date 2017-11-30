import { TestBed, inject } from '@angular/core/testing';

import { AppStateService } from './app-state.service';
import { MockStore } from '../store/mock-store';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { List } from 'immutable';
import { SdaFactory } from '../reducers/models/sda';
import { AircraftInfoFactory } from '../reducers/models/aircraft-info';

describe('AppStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateService,
        {
          provide: Store, useValue: new MockStore({
            selectedAlert: {
              loading: false,
              sda: SdaFactory(),
              noseNumbers: List.of(['A312', 'A330']),
              aircraftInfo: AircraftInfoFactory()
            }
          })
        }],
      imports: []
    });
  });

  xit('should ...', inject([AppStateService], (service: AppStateService) => {
    expect(service).toBeTruthy();
  }));
});
