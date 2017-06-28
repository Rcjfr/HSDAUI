import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPartComponent } from './search-by-part.component';

describe('SearchByPartComponent', () => {
  let component: SearchByPartComponent;
  let fixture: ComponentFixture<SearchByPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
