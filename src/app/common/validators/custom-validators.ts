import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static requiredIf(d: AbstractControl, val: string | number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      //console.log(d.value, c.value);
      if (d.value === String(val) && !c.value) {
        return { 'required': true };
      }
      return null;
    };
  }
  static validateScheduledMaintenanceFields(c: AbstractControl): { [key: string]: boolean } | null {

    const routineNoControl = c.get('routineNo');
    const nonRoutineNoControl = c.get('nonRoutineNo');

    if (nonRoutineNoControl.value || routineNoControl.value) {

      return null;
    }
    return { 'atleastone': true };
    //if ((nonRoutineNoControl.dirty || nonRoutineNoControl.touched) &&
    //    (routineNoControl.dirty || routineNoControl.touched)) {

    //  return { 'atleastone': true };
    //}
    
    //return null;
  };
  static validateUnscheduledMaintenanceFields(c: AbstractControl): { [key: string]: boolean } | null {

    const micNoControl = c.get('micNo');
    const nonRoutineNoControl = c.get('nonRoutineNo');
    if (micNoControl.value || nonRoutineNoControl.value) {
      return null;
    }
    return { 'atleastone': true };
    //if ((nonRoutineNoControl.dirty || nonRoutineNoControl.touched) &&
    //  (micNoControl.dirty || micNoControl.touched)) {

    //  return { 'atleastone': true };
    //}

    //return null;
  };
}
