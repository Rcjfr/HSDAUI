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
      const parent = c.parent;
      var cpcpRealted;
      if (parent != undefined)
       cpcpRealted = c.parent.get('cpcprelated');
      
      const damageOtherControl = c.get('damageOther');
      var filledContolCount: number;
    // var damageOtherTouched = damageOtherControl.touched;
      //if (cpcprelated.value != "1") return null;
      filledContolCount = 0;
      if (environmentControl.value ) {
          filledContolCount++; damageOtherControl.markAsUntouched();
      }
      if (gallySpillControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched(); }
      if (blockedDrainControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched(); }
      if (chemicalSpillControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched(); }
      if (wetinsulationBlanketControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched(); }
      if (missingFloorBoardTapeControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched();}
      if (hardwareNotInstalledControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched();}
      if (poorsealingPracticesControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched();}
      if (missingCorrosionInhibitorControl.value ) { filledContolCount++; damageOtherControl.markAsUntouched();} 
        if (damageOtherControl.value) { filledContolCount++; }

       
        if (parent == undefined)
            return null;
        if ((filledContolCount == 0 && cpcpRealted.value == 1) )
        { return { 'atleastone': true }; }
        if (filledContolCount == 0 || cpcpRealted.value == null)
        { return null; }
        if ((filledContolCount >= 1 && cpcpRealted.value == 0) || (filledContolCount >= 1 && cpcpRealted.value == 1))
        { return null; }

         
        //if (filledContolCount == 0 && damageOtherControl.value !=false)
        //    return { 'atleastone': true };
      return { 'atleastone': true };
  };

  //static validateCorrectiveActionRepairFields(c: AbstractControl): { [key: string]: boolean } | null {
      

  //    const repairDocument = c.get('repairDocument');
  //    const engineeringAuthorization = c.get('engineeringAuthorization');
  //    const parent = c.parent;
  //    var correctiveActionOption;
      
  //    if (parent != undefined)
  //        correctiveActionOption = parent.get('correctiveActionOptions');

  //    if (parent == undefined)
  //        return null;
  //    if (repairDocument.value || engineeringAuthorization.value) {

  //        return null;
  //    }

  //    if (correctiveActionOption.value == null)
  //        return null;
  //        if ((correctiveActionOption.value == 3) && (repairDocument.value || engineeringAuthorization.value))
  //        return { 'atleastone': true };

  //    return { 'atleastone': true };
      
  //};
  static validateCorrectiveActionRepairFields(c: AbstractControl): { [key: string]: boolean } | null {

      const repairDocumentControl = c.get('repairDocument');
      const engineeringAuthorizationControl = c.get('engineeringAuthorization');
      if (repairDocumentControl.value || engineeringAuthorizationControl.value) {
          return null;
      }
      return { 'atleastone': true };
      
  };
}
