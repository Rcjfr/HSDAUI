import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';

import { DteMonitorItemComponent } from './dte-monitor-item.component';
import { EventEmitter } from '@angular/core';

describe('DteMonitorItemComponent', () => {
  let component: DteMonitorItemComponent;
  let fixture: ComponentFixture<DteMonitorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DteMonitorItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteMonitorItemComponent);
    component = fixture.componentInstance;
    component.editable = false;
    component.index = 1;
    component.item = DteMonitorItemComponent.initMonitorItem({ monitorItemID: 0, monitorItemDescription: '' });
    component.message = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.removed).toEqual(jasmine.any(EventEmitter));
    expect(component.item).toEqual(jasmine.any(FormGroup));
  });

  it('should remove item', (done) => {
    component.removed.subscribe(g => {
      expect(g).toEqual(1);
      done();
    });
    component.remove();
  });

  it('should initialize a monitonItem', () => {
    const monitorItemFormGroup: FormGroup = DteMonitorItemComponent.initMonitorItem({ monitorItemID: 0, monitorItemDescription: 'test' });
    expect(monitorItemFormGroup).toEqual(jasmine.any(FormGroup));
  });
});
