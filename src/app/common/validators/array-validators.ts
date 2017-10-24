import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ArrayValidators {
  static required(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c && (<Array<any>>c.value).length === 0) {
        return { 'required': true };
      }

      return null;
    };
  }
  static minLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions && selectedOptions.length < count && count > 0) {
        return { 'minlength': true };
      }

      return null;
    };
  }
  static maxLength(count: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOptions = <Array<any>>c.value;
      if (selectedOptions && selectedOptions.length > count && count > 0) {
        return { 'maxlength': true };
      }

      return null;
    };
  }
}
