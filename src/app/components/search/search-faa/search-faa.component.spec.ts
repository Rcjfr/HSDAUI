import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFaaComponent } from './search-faa.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';


describe('SearchFaaComponent', () => {
  let component: SearchFaaComponent;
  let fixture: ComponentFixture<SearchFaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFaaComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
