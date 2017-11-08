import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';

import { EventEmitter } from '@angular/core';

import { DteThresholdItemComponent } from './dte-threshold-item.component';

describe('DteThresholdItemComponent', () => {
  let component: DteThresholdItemComponent;
  let fixture: ComponentFixture<DteThresholdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DteThresholdItemComponent],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteThresholdItemComponent);
    component = fixture.componentInstance;
    component.editable = false;
    component.index = 1;
    component.item = DteThresholdItemComponent.initThreshold({ thresholdItemID: 1, inspectionInterval: 'test1', inspectionMethod: 'test2', inspectionThreshold: 'test3' });
    component.message = {};
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

  it('should initialize a thresholdItem', () => {
    const thresholdItemFormGroup = DteThresholdItemComponent.initThreshold({ thresholdItemID: 1, inspectionInterval: 'test11', inspectionMethod: 'test22', inspectionThreshold: 'test33' });
    expect(thresholdItemFormGroup).toEqual(jasmine.any(FormGroup));
  });
});
