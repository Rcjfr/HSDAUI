import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { decimalsNumberMask } from '@app/common/masks';

@Component({
  selector: 'aa-repair-details-section',
  templateUrl: './repair-details-section.component.html',
  styleUrls: ['./repair-details-section.component.less']
})
export class RepairDetailsSectionComponent extends BaseFormComponent implements OnInit, OnChanges {
  repairDescriptions$: Observable<models.IBaseLookUp[]>;
  repairDocuments$: Observable<models.IBaseLookUp[]>;
  createNumberMask = createNumberMask;
  public numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });
  repairDetailsSectionGroup: FormGroup;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('repairDetailsSectionGroup', authService);
    this.repairDetailsSectionGroup = this.fb.group({
      engineeringAuthorization: ['', []],
      routineTaskCard: ['', []],
      nonRoutine: ['', []],
      repairDocumentType: ['', []],
      chapFigRepairText: ['', []],
      repairDescriptionType: ['', []],
      partNomenclature: ['', []],
      partNumber: ['', []],
      partSerialNumber: ['', []],
      height: ['', []],
      width: ['', []],
      isExternallyVisible: ['', []]
    });
  }

  ngOnInit() {
    this.repairDescriptions$ = this.appStateService.getRepairDescriptions();
    this.repairDocuments$ = this.appStateService.getRepairDocuments();

    this.repairDetailsSectionGroup.disable();
    this.parent.addControl(this.formGroupName, this.repairDetailsSectionGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      this.repairDetailsSectionGroup.patchValue(
        {
          engineeringAuthorization: this.sda.correctiveActionSection.engineeringAuthorization,
          routineTaskCard: this.sda.generalSection.routineNo,
          nonRoutine: this.sda.generalSection.nonRoutineNo,
          repairDocumentType: this.sda.correctiveActionSection.repairDocumentType,
          chapFigRepairText: this.sda.correctiveActionSection.chapFigRepairText,
          repairDescriptionType: this.sda.correctiveActionSection.repairDescriptionType,
          partNomenclature: this.sda.defectLocationSection.partDefective,
          partNumber: this.sda.defectLocationSection.manufacturerPartNo,
          partSerialNumber: this.sda.defectLocationSection.manufacturerSerialNo,
          height: this.sda.correctiveActionSection.repairHeight,
          width: this.sda.correctiveActionSection.repairWidth,
          isExternallyVisible: this.sda.correctiveActionSection.isExternallyVisible
        },
        { emitEvent: false });
    }
  }
}
