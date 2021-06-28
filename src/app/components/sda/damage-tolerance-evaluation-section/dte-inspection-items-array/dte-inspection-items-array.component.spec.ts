import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';

import { Observable } from 'rxjs/Rx';

import { DteInspectionItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-item/dte-inspection-item.component';
import { DteInspectionItemsArrayComponent } from './dte-inspection-items-array.component';

describe('DteInspectionItemsArrayComponent', () => {
  let component: DteInspectionItemsArrayComponent;
  let fixture: ComponentFixture<DteInspectionItemsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
      declarations: [DteInspectionItemsArrayComponent, DteInspectionItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteInspectionItemsArrayComponent);
    component = fixture.componentInstance;
    component.editable = false;
    component.errorMessages = {};
    component.itemsFormArray = DteInspectionItemsArrayComponent.buildItems([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create new threshold item', () => {
    component.addThresholdItem();
    expect(component.itemsFormArray.controls.length).toEqual(1);
  });

  it('should be able to delete a threshold item when confirmed', () => {
    const dialogService = fixture.debugElement.injector.get(DialogService);
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(true));
    const existingItemCount = component.itemsFormArray.controls.length;
    component.addThresholdItem();
    component.deleteThresholdItem(0);
    expect(component.itemsFormArray.controls.length).toEqual(existingItemCount);
  });

  it('should not delete a monitor item when not confirmed', () => {
    const dialogService = fixture.debugElement.injector.get(DialogService);
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    const existingItemCount = component.itemsFormArray.controls.length;
    component.addThresholdItem();
    component.deleteThresholdItem(0);
    expect(component.itemsFormArray.controls.length).toEqual(existingItemCount + 1);
  });

  it('should init a formArray', () => {
    const formArray = DteInspectionItemsArrayComponent.buildItems([{ thresholdItemID: 1, inspectionInterval: 'test1', inspectionMethod: 'test2', inspectionThreshold: 'test3' }]);
    expect(formArray.controls.length).toEqual(1);
  });

  it('should not be able to add more than 5 items', () => {
    for (let i = 0; i < 6; i++) {
      component.addThresholdItem();
    }
    expect(component.itemsFormArray.controls.length).toEqual(5);
  });
});
