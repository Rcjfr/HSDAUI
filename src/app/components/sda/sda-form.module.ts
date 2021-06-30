/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { NgPipesModule } from 'ng-pipes';
import { FileUploadModule } from 'ng2-file-upload';


import { FormControlsModule } from '@app/common/components/form-controls.module';

import { BaseFormComponent } from './base-form.component';

// General Section
import { GeneralSectionFormComponent } from '@app/components/sda/general-section/general-section-form/general-section-form.component';
import { AircraftInfoSectionFormComponent } from '@app/components/sda/general-section/aircraft-info-section-form/aircraft-info-section-form.component';
import { AtaCodeComponent } from '@app/components/sda/general-section/ata-code/ata-code.component';
import {
  DefectDiscoveredDuringSectionFormComponent
} from '@app/components/sda/general-section/defect-discovered-during-section-form/defect-discovered-during-section-form.component';
import { ScheduledMaintenanceSectionComponent } from '@app/components/sda/general-section/scheduled-maintenance-section/scheduled-maintenance-section.component';
import {
  UnscheduledMaintenanceSectionComponent
} from '@app/components/sda/general-section/unscheduled-maintenance-section/unscheduled-maintenance-section.component';



// Defect Location Section
import { DefectLocationSectionFormComponent } from '@app/components/sda/defect-location-section/defect-location-section-form/defect-location-section-form.component';
import { PreciseLocationGroupComponent } from '@app/components/sda/defect-location-section/precise-location-group/precise-location-group.component';

// CPCP Section


import { CpcpSectionComponent } from '@app/components/sda/cpcp-section/cpcp-section/cpcp-section.component';
import { CauseOfDamageGroupComponent } from '@app/components/sda/cpcp-section/cause-of-damage-group/cause-of-damage-group.component';
import { CauseOfDamageDescriptionComponent } from '@app/components/sda/cpcp-section/cause-of-damage-description/cause-of-damage-description.component';


// Corrective Action Section

import { CorrectiveActionFormGroupComponent } from '@app/components/sda/corrective-action-section/corrective-action-form/corrective-action-form.component';
import {
  CorrectiveActionRepairDescriptionComponent
} from '@app/components/sda/corrective-action-section/corrective-action-repair-description/corrective-action-repair-description.component';
import { CorrectiveActionOptionsComponent } from '@app/components/sda/corrective-action-section/corrective-action-options/corrective-action-options.component';
import { CorrectiveActionChapComponent } from '@app/components/sda/corrective-action-section/corrective-action-chap/corrective-action-chap.component';
import { ModifiedPartDescriptionComponent } from '@app/components/sda/corrective-action-section/modified-part-description/modified-part-description.component';
import { DefectivePartDescriptionComponent } from '@app/components/sda/corrective-action-section/defective-part-description/defective-part-description.component';



// CPCP Disposition Section
import { CpcpDispositionSectionComponent } from '@app/components/sda/cpcp-disposition-section/cpcp-disposition-section/cpcp-disposition-section.component';


// Damage Tolerance Evaluation Section
import { DamageToleranceEvaluationComponent } from '@app/components/sda/damage-tolerance-evaluation-section/damage-tolerance-evaluation/damage-tolerance-evaluation.component';

import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';

import { DteInspectionItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-item/dte-inspection-item.component';
import { DteInspectionItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-items-array/dte-inspection-items-array.component';

import { DteMonitorItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-item/dte-monitor-item.component';
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';

//Repair Details Section
import { RepairDetailsSectionComponent } from '@app/components/sda/repair-details-section/repair-details-section/repair-details-section.component';
//Current Status Section
import { CurrentStatusSectionComponent } from '@app/components/sda/current-status-section/current-status-section/current-status-section.component';
import { DteEngineComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-engine/dte-engine.component';
import { DteComponentComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-component/dte-component.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule,
    NKDatetimeModule,
    TypeaheadModule.forRoot(),
    TextMaskModule,
    NgPipesModule,
    FileUploadModule,
    ModalModule.forRoot()
  ],
  exports: [
    GeneralSectionFormComponent,
    AircraftInfoSectionFormComponent,
    DefectLocationSectionFormComponent,
    DefectDiscoveredDuringSectionFormComponent,
    ScheduledMaintenanceSectionComponent,
    UnscheduledMaintenanceSectionComponent,
    AtaCodeComponent,
    PreciseLocationGroupComponent,
    CpcpSectionComponent,
    CauseOfDamageGroupComponent,
    CorrectiveActionFormGroupComponent,
    CorrectiveActionOptionsComponent,
    CorrectiveActionRepairDescriptionComponent,
    CauseOfDamageDescriptionComponent,
    CorrectiveActionChapComponent,
    ModifiedPartDescriptionComponent,
    DefectivePartDescriptionComponent,
    RepairDetailsSectionComponent,
    CurrentStatusSectionComponent,
    CpcpDispositionSectionComponent,
    DamageToleranceEvaluationComponent,
    DteComponentComponent,
    DteEngineComponent
    
  ],
  declarations: [
    GeneralSectionFormComponent,
    AircraftInfoSectionFormComponent,
    DefectLocationSectionFormComponent,
    DefectDiscoveredDuringSectionFormComponent,
    ScheduledMaintenanceSectionComponent,
    UnscheduledMaintenanceSectionComponent,
    AtaCodeComponent,
    PreciseLocationGroupComponent,
    CpcpSectionComponent,
    CauseOfDamageGroupComponent,
    CorrectiveActionFormGroupComponent,
    CorrectiveActionOptionsComponent,
    CorrectiveActionRepairDescriptionComponent,
    CauseOfDamageDescriptionComponent,
    CorrectiveActionChapComponent,
    ModifiedPartDescriptionComponent,
    DefectivePartDescriptionComponent,
    RepairDetailsSectionComponent,
    CurrentStatusSectionComponent,
    CpcpDispositionSectionComponent,
    DamageToleranceEvaluationComponent,
    DteThresholdItemComponent,
    DteThresholdItemsArrayComponent,
    DteInspectionItemComponent,
    DteInspectionItemsArrayComponent,
    DteMonitorItemComponent,
    DteMonitorItemsArrayComponent,
    DteComponentComponent,
    DteEngineComponent

  ],
  providers: []
})
export class SdaFormModule { }
