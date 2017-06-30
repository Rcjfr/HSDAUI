import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByAircraftModelComponent } from './search-by-aircraft-model.component';

describe('SearchByAircraftModelComponent', () => {
  let component: SearchByAircraftModelComponent;
  let fixture: ComponentFixture<SearchByAircraftModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAircraftModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByAircraftModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
