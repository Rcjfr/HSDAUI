import { SearchByAircraftComponent } from '../search/search-by-aircraft/search-by-aircraft.component';
import { SearchByCorrosionComponent } from '../search/search-by-corrosion/search-by-corrosion.component';
import { SearchByCpcpDispositionComponent } from '../search/search-by-cpcp-disposition/search-by-cpcp-disposition.component';
import { SearchByDateRangeComponent } from '../search/search-by-date-range/search-by-date-range.component';
import { SearchByMaintenanceComponent } from '../search/search-by-maintenance/search-by-maintenance.component';
import { SearchBySdaFormComponent } from '../search/search-by-sda-form/search-by-sda-form.component';
import { SearchByDefectComponent } from '../search/search-by-defect/search-by-defect.component';
import { SearchByCorrectiveActionComponent } from '../search/search-by-corrective-action/search-by-corrective-action.component';
import { SearchByStatusComponent } from '../search/search-by-status/search-by-status.component';
import { SearchByPartComponent } from '../search/search-by-part/search-by-part.component';
import { SearchOptionsComponent } from '../search/search-options/search-options.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { AlertsSearchComponent } from './alerts-search.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';
import { AppStateService } from '../../common/services';
import { DialogService } from 'ng2-bootstrap-modal';

describe('AlertsSearchComponent', () => {
  let component: AlertsSearchComponent;
  let fixture: ComponentFixture<AlertsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsSearchComponent, SearchByAircraftComponent,
        SearchByCorrosionComponent, SearchByCpcpDispositionComponent,
        SearchByDateRangeComponent, SearchByMaintenanceComponent,
        SearchBySdaFormComponent, SearchByDefectComponent,
        SearchByCorrectiveActionComponent, SearchByStatusComponent,
        SearchByPartComponent, SearchOptionsComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, AccordionModule.forRoot(),
            NKDatetimeModule, TypeaheadModule.forRoot(), NgPipesModule, TextMaskModule],
      schemas: [],
      providers: [AppStateService, DialogService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
