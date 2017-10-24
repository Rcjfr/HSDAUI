import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';

import { DteMonitorItemComponent } from './dte-monitor-item.component';

describe('DteMonitorItemComponent', () => {
  let component: DteMonitorItemComponent;
  let fixture: ComponentFixture<DteMonitorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
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
    component.item = DteMonitorItemComponent.initMonitorItem({ monitorItemDescription: '' });
    component.message = '';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
