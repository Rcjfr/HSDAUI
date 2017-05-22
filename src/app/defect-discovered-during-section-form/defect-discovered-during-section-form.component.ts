import { Component, OnInit, Input, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { GenericValidator, Expressions } from '../common/validators/generic-validator';
import { CustomValidators } from '../common/validators/custom-validators';
import { ValidationMessages } from './defect-discovered-during-section-form.messages';
@Component({
  selector: 'app-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less']
})
export class DefectDiscoveredDuringSectionFormComponent implements OnInit {
@Input() parent: FormGroup;
@Input() displayMessage: { [key: string]: string } = {};
defectDiscoveredDuringSectionFormGroup: FormGroup;
@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
private genericValidator: GenericValidator;
  constructor(private fb: FormBuilder) {
    this.genericValidator = new GenericValidator(ValidationMessages);
  }
xngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
      console.log(this.formInputElements.length);
        let controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => {
              //console.log(new Date(),formControl.nativeElement.id);
            return Observable.fromEvent(formControl.nativeElement, 'blur');
            }
          );

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.defectDiscoveredDuringSectionFormGroup.valueChanges.debounceTime(400), ...controlBlurs)
            // .debounceTime(800)
            .subscribe(value => {
              this.displayMessage = this.genericValidator.processMessages(this.defectDiscoveredDuringSectionFormGroup); });
    }
  ngOnInit() {
    this.defectDiscoveredDuringSectionFormGroup = this.fb.group({
      defectDiscoveredDuring: ['', [Validators.required]],
      scheduledMaintenanceGroup: this.fb.group({
          checkType: ['', []],
          nonRoutineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]],
          routineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]]
        },
        {
          validator: CustomValidators.validateScheduledMaintenanceFields
        }
      ),
      unscheduledMaintenanceGroup: this.fb.group({
          description: ['', []],
          nonRoutineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]],
          micNo: ['', [Validators.pattern(Expressions.Alphanumerics)]]
        },
        {
          validator: CustomValidators.validateUnscheduledMaintenanceFields
        }
      )
    });
    this.parent.addControl('defectDiscoveredDuringSectionFormGroup', this.defectDiscoveredDuringSectionFormGroup);
     this.defectDiscoveredDuringSectionFormGroup.get('defectDiscoveredDuring').valueChanges
            .subscribe(val => this.setDefectDetectedFields(val));
  }
  setDefectDetectedFields(defectDiscoveredDuring: number): void {
        const scheduledGroup = this.defectDiscoveredDuringSectionFormGroup.get('scheduledMaintenanceGroup');
        const unscheduledGroup = this.defectDiscoveredDuringSectionFormGroup.get('unscheduledMaintenanceGroup');
        if (defectDiscoveredDuring == 1) {
            unscheduledGroup.clearValidators();
            unscheduledGroup.get("description").clearValidators();
            unscheduledGroup.get("micNo").clearValidators();
            unscheduledGroup.get("nonRoutineNo").clearValidators();

            scheduledGroup.setValidators(CustomValidators.validateScheduledMaintenanceFields);
            scheduledGroup.get("checkType").setValidators([Validators.required]);
            scheduledGroup.get("routineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            scheduledGroup.get("nonRoutineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
        } else {
            scheduledGroup.clearValidators();
            scheduledGroup.get('checkType').clearValidators();
            scheduledGroup.get('routineNo').clearValidators();
            scheduledGroup.get('nonRoutineNo').clearValidators();
            unscheduledGroup.setValidators(CustomValidators.validateUnscheduledMaintenanceFields);
            unscheduledGroup.get('description').setValidators([Validators.required]);
            unscheduledGroup.get('micNo').setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            unscheduledGroup.get('nonRoutineNo').setValidators([Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]);
        }
        scheduledGroup.updateValueAndValidity();
        unscheduledGroup.updateValueAndValidity();
        scheduledGroup.get('checkType').updateValueAndValidity();
        scheduledGroup.get('routineNo').updateValueAndValidity();
        scheduledGroup.get('nonRoutineNo').updateValueAndValidity();
        unscheduledGroup.get('description').updateValueAndValidity();
        unscheduledGroup.get('micNo').updateValueAndValidity();
        unscheduledGroup.get('nonRoutineNo').updateValueAndValidity();
    }

}
