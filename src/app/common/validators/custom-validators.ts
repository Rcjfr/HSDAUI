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

  static validatePreciseLocationGroupFields(c: AbstractControl): { [key: string]: boolean } | null {
      
      const stationLocationControl = c.get('stationLocation');
      const stringerControl = c.get('stringer');
      const wlControl = c.get('wl');
      const blControl = c.get('bl');
      //if (stationLocationControl.value || stringerControl.value || wlControl.value || blControl.value) {
      //    return null;
      //}
      //return { 'aleasttwo': true };
      var filledContolCount: number;
       filledContolCount = 0;
      if (stationLocationControl.value) {
          filledContolCount++;
      }
      if (stringerControl.value) { filledContolCount++;}
      if (wlControl.value) { filledContolCount++; }
      if (blControl.value) { filledContolCount++; }
      if (filledContolCount>=2)
      { return null; }


      return {'aleasttwo':true};
  };
  static ValidateCauseOfDamageGroupFields(c: AbstractControl): { [key: string]: boolean } | null {
      //const cpcprelated = c.parent.get('cpcprelated');

      const environmentControl = c.get('environment');
      const gallySpillControl = c.get('gallySpill');
      const blockedDrainControl = c.get('blockedDrain');
      const chemicalSpillControl = c.get('chemicalSpill');
      const wetinsulationBlanketControl = c.get('wetinsulationBlanket');
      const missingFloorBoardTapeControl = c.get('missingFloorBoardTape');
      const hardwareNotInstalledControl = c.get('hardwareNotInstalled');
      const poorsealingPracticesControl = c.get('poorsealingPractices');
      const missingCorrosionInhibitorControl = c.get('missingCorrosionInhibitor');
      const damageOtherControl = c.get('damageOther');

      var filledContolCount: number;

      //if (cpcprelated.value != "1") return null;
      filledContolCount = 0;
      if (environmentControl.value) {
          filledContolCount++;
      }
      if (gallySpillControl.value) { filledContolCount++; }
      if (blockedDrainControl.value) { filledContolCount++; }
      if (chemicalSpillControl.value) { filledContolCount++; }
      if (wetinsulationBlanketControl.value) { filledContolCount++; }
      if (missingFloorBoardTapeControl.value) { filledContolCount++; }
      if (hardwareNotInstalledControl.value) { filledContolCount++; }
      if (poorsealingPracticesControl.value) { filledContolCount++; }
      if (missingCorrosionInhibitorControl.value) { filledContolCount++; }
      if (damageOtherControl.value) { filledContolCount++; }

      //if (cpcprelated.value != "1")
      //    return null;
      if (filledContolCount >= 1)
      { return null; }


      return { 'atleastone': true };
  };
  static validateCorrectiveActionFormFields(c: AbstractControl): { [key: string]: boolean } | null {

      const deferralCodeControl = c.get('deferralCode');
      const deferralControl = c.get('deferral');

      if (deferralCodeControl.value || deferralCodeControl.value) {

          return null;
      }
      return { 'atleastone': true };
      
  };
}
