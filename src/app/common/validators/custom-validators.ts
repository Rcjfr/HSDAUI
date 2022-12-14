import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Status } from '@app/common/models';
import * as moment from 'moment';

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
  static validateFutureDate(c: AbstractControl): { [key: string]: boolean } | null {
    const date = moment(<Date>c.value).startOf('day');
    const toDay = moment().startOf('day');
    if (date > toDay) {
      return { 'future': true };
    }

    return null;
  };
  static validateScheduledMaintenanceFields(c: AbstractControl): { [key: string]: boolean } | null {

    const routineNoControl = c.get('routineNo');
    const nonRoutineNoControl = c.get('nonRoutineNo');

    if (nonRoutineNoControl.value || routineNoControl.value) {

      return null;
    }

    return { 'atleastone': true };
    // if ((nonRoutineNoControl.dirty || nonRoutineNoControl.touched) &&
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

    const stationLocationControl = c.get('aircraftStation');
    const stringerControl = c.get('stringer');
    const wlControl = c.get('waterLine');
    const blControl = c.get('buttLine');
    //if (stationLocationControl.value || stringerControl.value || wlControl.value || blControl.value) {
    //    return null;
    //}
    //return { 'aleasttwo': true };
    let filledContolCount = 0;
    if (stationLocationControl.value) {
      filledContolCount++;
    }
    if (stringerControl.value) { filledContolCount++; }
    if (wlControl.value) { filledContolCount++; }
    if (blControl.value) { filledContolCount++; }
    if (filledContolCount >= 2) { return null; }


    return { 'aleasttwo': true };
  };
  static validateCauseOfDamageGroupFields(c: AbstractControl): { [key: string]: boolean } | null {
    //const iscpcpRelatedEvent = c.parent.get('iscpcpRelatedEvent');
    const statusControl = c.get('status');
    const environmentControl = c.get('environment');
    const galleySpillControl = c.get('galleySpill');
    const blockedDrainControl = c.get('blockedDrain');
    const chemicalSpillControl = c.get('chemicalSpill');
    const wetInsulationBlanketControl = c.get('wetInsulationBlanket');
    const missingFloorBoardTapeControl = c.get('missingFloorBoardTape');
    const hardwareNotInstalledControl = c.get('hardwareNotInstalled');
    const poorSealingPracticesControl = c.get('poorSealingPractices');
    const missingCorrosionInhibitorControl = c.get('missingCorrosionInhibitor');
    const parent = c.parent;
    let iscpcpRelatedEvent;
    if (parent !== undefined) {
      iscpcpRelatedEvent = c.parent.get('isCPCPRelatedEvent');
    }

    const damageOtherControl = c.get('damageOther');
    let filledContolCount: number;
    // var damageOtherTouched = damageOtherControl.touched;
    filledContolCount = 0;
    if (environmentControl.value) {
      filledContolCount++; damageOtherControl.markAsUntouched();
    }
    if (galleySpillControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (blockedDrainControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (chemicalSpillControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (wetInsulationBlanketControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (missingFloorBoardTapeControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (hardwareNotInstalledControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (poorSealingPracticesControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (missingCorrosionInhibitorControl.value) { filledContolCount++; damageOtherControl.markAsUntouched(); }
    if (damageOtherControl.value) { filledContolCount++; }


    if (parent === undefined) {
      return null;
    }

    if (iscpcpRelatedEvent.value !== true || <Status>statusControl.value === Status.Open) { //if SDA is open or not cpcp event, no validation required
      return null;
    }

    if ((damageOtherControl.touched && damageOtherControl.value === false)) {
      return { 'atleastone': true };
    }

    if ((filledContolCount >= 1 && iscpcpRelatedEvent.value === true) || (filledContolCount >= 1 && iscpcpRelatedEvent.value === false)) {
      return null;
    }

    if (filledContolCount === 0 && damageOtherControl.value !== false && damageOtherControl.value === '') {
      return { 'atleastone': true };
    }

    if (filledContolCount === 0 && iscpcpRelatedEvent.value === true) {
      return { 'atleastone': true };
    }

    return null;
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

  static validateCorrectiveActionRepairFields (c: AbstractControl): { [key: string]: boolean } | null {
      const statusControl = c.get('status');
      const repairDocumentControl = c.get('repairDocumentType');
      const engineeringAuthorizationControl = c.get('engineeringAuthorization');
      if (repairDocumentControl.value || engineeringAuthorizationControl.value) {
        return null;
      }
      if (<Status>statusControl.value === Status.Complete) {
        return { 'atleastone': true };
      }

      return null;
    }
}
