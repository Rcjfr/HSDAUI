import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCorrosionComponent } from './search-by-corrosion.component';

describe('SearchByCorrosionComponent', () => {
  let component: SearchByCorrosionComponent;
  let fixture: ComponentFixture<SearchByCorrosionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCorrosionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCorrosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
