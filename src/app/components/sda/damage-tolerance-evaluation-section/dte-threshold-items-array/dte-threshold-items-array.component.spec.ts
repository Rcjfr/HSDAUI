import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../../common/components/confirm/confirm.component';

import { Observable } from 'rxjs/Rx';

import { DteThresholdItemComponent } from './../dte-threshold-item/dte-threshold-item.component';
import { DteThresholdItemsArrayComponent } from './dte-threshold-items-array.component';

xdescribe('DteThresholdItemsArrayComponent', () => {
  let component: DteThresholdItemsArrayComponent;
  let fixture: ComponentFixture<DteThresholdItemsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
      declarations: [DteThresholdItemsArrayComponent, DteThresholdItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteThresholdItemsArrayComponent);
    component = fixture.componentInstance;
    component.editable = false;
    component.errorMessages = {};
    component.itemsFormArray = DteThresholdItemsArrayComponent.buildItems([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
