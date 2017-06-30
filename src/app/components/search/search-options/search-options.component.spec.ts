import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByOptionsComponent } from './search-by-options.component';

describe('SearchByOptionsComponent', () => {
  let component: SearchByOptionsComponent;
  let fixture: ComponentFixture<SearchByOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
