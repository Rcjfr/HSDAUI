import { TestBed, inject } from '@angular/core/testing';

import { AppStateService } from './app-state.service';
import { MockStore } from '../store/mock-store';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { List } from 'immutable';
import { sdaFactory } from '../reducers/models/sda';
import { aircraftInfoFactory } from '../reducers/models/aircraft-info';

describe('AppStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateService,
        {
          provide: Store, useValue: new MockStore({
            selectedAlert: {
              loading: false,
              sda: sdaFactory(),
              noseNumbers: List.of(['A312', 'A330']),
              aircraftInfo: aircraftInfoFactory()
            }
          })
        }],
      imports: []
    });
  });

  it('should ...', inject([AppStateService], (service: AppStateService) => {
    expect(service).toBeTruthy();
  }));
});
