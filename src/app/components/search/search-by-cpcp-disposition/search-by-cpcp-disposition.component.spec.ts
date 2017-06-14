import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCpcpDispositionComponent } from './search-by-cpcp-disposition.component';

describe('SearchByCpcpDispositionComponent', () => {
  let component: SearchByCpcpDispositionComponent;
  let fixture: ComponentFixture<SearchByCpcpDispositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCpcpDispositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCpcpDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
