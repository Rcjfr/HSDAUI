import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { SearchByDateRangeComponent } from './search-by-date-range.component';
import { FormControlsModule } from '../../../common/components/form-controls.module';
describe('SearchByDateRangeComponent', () => {
  let component: SearchByDateRangeComponent;
  let fixture: ComponentFixture<SearchByDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDateRangeComponent],
      imports: [NKDatetimeModule, FormControlsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
