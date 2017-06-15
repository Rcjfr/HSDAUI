import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { SearchByDateRangeComponent } from './search-by-date-range.component';
import { FieldContainer } from '../../../common/directives/form/field-container'
describe('SearchByDateRangeComponent', () => {
  let component: SearchByDateRangeComponent;
  let fixture: ComponentFixture<SearchByDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDateRangeComponent, FieldContainer],
      imports: [NKDatetimeModule]
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
