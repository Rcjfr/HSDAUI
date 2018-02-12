import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchByDateRangeComponent } from './search-by-date-range.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, UtilityService } from '@app/common/services';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import * as moment from 'moment';

describe('SearchByDateRangeComponent', () => {
  let component: SearchByDateRangeComponent;
  let fixture: ComponentFixture<SearchByDateRangeComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByDateRangeComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot(),
        NKDatetimeModule
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDateRangeComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
