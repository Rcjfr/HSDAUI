import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDateRangeComponent } from './search-by-date-range.component';

describe('SearchByDateRangeComponent', () => {
  let component: SearchByDateRangeComponent;
  let fixture: ComponentFixture<SearchByDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByDateRangeComponent ]
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
