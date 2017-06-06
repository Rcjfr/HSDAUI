import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByAircraftComponent } from './search-by-aircraft.component';

describe('SearchByAircraftComponent', () => {
  let component: SearchByAircraftComponent;
  let fixture: ComponentFixture<SearchByAircraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAircraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
