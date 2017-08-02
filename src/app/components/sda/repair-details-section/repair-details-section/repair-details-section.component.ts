import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../../base-form.component';
import { GenericValidator, Expressions } from '../../../../common/validators/generic-validator';
import { CustomValidators } from '../../../../common/validators/custom-validators';
import { AppStateService } from '../../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../../common/models';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { decimalsNumberMask } from '../../../../common/masks';

@Component({
  selector: 'aa-repair-details-section',
  templateUrl: './repair-details-section.component.html',
  styleUrls: ['./repair-details-section.component.less']
})
export class RepairDetailsSectionComponent extends BaseFormComponent implements OnInit {
     repairDescriptions$: Observable<List<models.IRepairDescription>>;
    repairDocuments$: Observable<List<models.IRepairDocument>>;
    createNumberMask = createNumberMask;
    public  numberMask = createNumberMask({
        prefix: '',
        allowDecimal: false,
        includeThousandsSeparator: false,
        allowLeadingZeroes: false
    });
    repairDetailsSectionGroup: FormGroup;

    constructor(private fb: FormBuilder, private appStateService: AppStateService) {
        super('repairDetailsSectionGroup');
    }
    ngOnInit() {
       this.repairDescriptions$ = this.appStateService.getRepairDescriptions();
        this.repairDocuments$ = this.appStateService.getRepairDocuments();
        this.repairDetailsSectionGroup = this.fb.group({
            engineeringAuthorization: ['', [Validators.maxLength(25)]],
            routineTaskCard: ['', [Validators.maxLength(50)]],
            nonRoutine: ['', [Validators.maxLength(50)]],
            repairDocumentType: ['', []],
            chapFigRepairText: ['', [Validators.maxLength(25)]],
            repairDescriptionType: ['', []],
            partNomenclature: ['', [Validators.maxLength(50)]],
            partNumber: ['', [Validators.maxLength(50)]],
            partSerialNumber: ['', [Validators.maxLength(50)]],
            height: ['', [Validators.maxLength(3)]],
            width: ['', [Validators.maxLength(3)]],
            isExternallyVisible: ['', []]
        });
        this.parent.addControl(this.formGroupName, this.repairDetailsSectionGroup);
  }

}
