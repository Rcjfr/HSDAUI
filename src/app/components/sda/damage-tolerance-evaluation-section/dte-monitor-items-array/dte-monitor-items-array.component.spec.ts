import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../../common/components/confirm/confirm.component';
import { DteMonitorItemsArrayComponent } from './dte-monitor-items-array.component';
import { DteMonitorItemComponent } from './../dte-monitor-item/dte-monitor-item.component';
import { Observable } from 'rxjs/Rx';

describe('DteMonitorItemsArrayComponent', () => {
  let component: DteMonitorItemsArrayComponent;
  let fixture: ComponentFixture<DteMonitorItemsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
      declarations: [DteMonitorItemsArrayComponent, DteMonitorItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule
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

  it('should create new monitor item', () => {
    component.addMonitorItem();
    expect(component.itemsFormArray.controls.length).toEqual(1);
  });

  it('should be able to delete a monitor item when confirmed', () => {
    const dialogService = fixture.debugElement.injector.get(DialogService);
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(true));
    const existingItemCount = component.itemsFormArray.controls.length;
    component.addMonitorItem();
    component.deleteMonitorItem(0);
    expect(component.itemsFormArray.controls.length).toEqual(existingItemCount);
  });

  it('should not delete a monitor item when not confirmed', () => {
    const dialogService = fixture.debugElement.injector.get(DialogService);
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    const existingItemCount = component.itemsFormArray.controls.length;
    component.addMonitorItem();
    component.deleteMonitorItem(0);
    expect(component.itemsFormArray.controls.length).toEqual(existingItemCount + 1);
  });

  it('should init a formArray', () => {
    const formArray = DteMonitorItemsArrayComponent.buildItems([{ monitorItemID: 1, monitorItemDescription: 'test' }]);
    expect(formArray.controls.length).toEqual(1);
  });

  it('should not be able to add more than 5 items', () => {
    for (let i = 0; i < 6; i++) {
      component.addMonitorItem();
    }
    expect(component.itemsFormArray.controls.length).toEqual(5);
  });
});
