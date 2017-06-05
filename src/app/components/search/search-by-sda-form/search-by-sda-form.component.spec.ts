import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySdaFormComponent } from './search-by-sda-form.component';

describe('SearchBySdaFormComponent', () => {
  let component: SearchBySdaFormComponent;
  let fixture: ComponentFixture<SearchBySdaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBySdaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBySdaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
