import { SearchByAircraftComponent } from "../search/search-by-aircraft/search-by-aircraft.component";
import { SearchByCorrosionComponent } from "../search/search-by-corrosion/search-by-corrosion.component";
import { SearchByCpcpDispositionComponent } from "../search/search-by-cpcp-disposition/search-by-cpcp-disposition.component";
import { SearchByDateRangeComponent } from "../search/search-by-date-range/search-by-date-range.component";
import { SearchByMaintenanceComponent } from "../search/search-by-maintenance/search-by-maintenance.component";
import { SearchBySdaFormComponent } from "../search/search-by-sda-form/search-by-sda-form.component";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { AlertsSearchComponent } from './alerts-search.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AlertsSearchComponent', () => {
  let component: AlertsSearchComponent;
  let fixture: ComponentFixture<AlertsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsSearchComponent, SearchByAircraftComponent,
        SearchByCorrosionComponent, SearchByCpcpDispositionComponent,
        SearchByDateRangeComponent, SearchByMaintenanceComponent,
        SearchBySdaFormComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, AccordionModule.forRoot(), NKDatetimeModule, TypeaheadModule.forRoot()],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
