import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AppStateService, UtilityService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { SearchByDteComponent } from './search-by-dte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';


describe('SearchByDteComponent', () => {
  let component: SearchByDteComponent;
  let fixture: ComponentFixture<SearchByDteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDteComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        ToastrModule.forRoot({
          timeOut: 800,
          progressBar: true,
          onActivateTick: true,
          enableHtml: true,
        }),
        NKDatetimeModule,
        NgPipesModule, TextMaskModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SearchByDteComponent should create', () => {
    expect(component).toBeTruthy();
  });
});
