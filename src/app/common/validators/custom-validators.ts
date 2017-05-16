import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static requiredIf(d: AbstractControl, val: string | number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (d.value === String(val) && !c.value) {
        return { 'required': true };
      }
      return null;
    };
  }
  static validateScheduledMaintenanceFields(d: AbstractControl, val: string | number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (d.value !== String(val)) {
        return null;
      }
      const routineNoControl = c.get('routineNo');
      const nonRoutineNoControl = c.get('nonRoutineNo');

      if (nonRoutineNoControl.value || routineNoControl.value) {

        return null;
      }
      return { 'atleastone': true };

    };
  }
  static validateUnscheduledMaintenanceFields(d: AbstractControl, val: string | number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (d.value !== String(val)) {
        return null;
      }
      const micNoControl = c.get('micNo');
      const nonRoutineNoControl = c.get('nonRoutineNo');
      if (micNoControl.value || nonRoutineNoControl.value) {
        return null;
      }
      return { 'atleastone': true };
    };
  }
}