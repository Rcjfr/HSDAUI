import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../../common/components/confirm/confirm.component';
import { DteMonitorItemsArrayComponent } from './dte-monitor-items-array.component';
import { DteMonitorItemComponent } from './../dte-monitor-item/dte-monitor-item.component';

xdescribe('DteMonitorItemsArrayComponent', () => {
  let component: DteMonitorItemsArrayComponent;
  let fixture: ComponentFixture<DteMonitorItemsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
      declarations: [DteMonitorItemsArrayComponent, DteMonitorItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule, DialogService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteMonitorItemsArrayComponent);
    component = fixture.componentInstance;
    component.editable = false;
    component.errorMessages = {};
    component.itemsFormArray = DteMonitorItemsArrayComponent.buildItems([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
