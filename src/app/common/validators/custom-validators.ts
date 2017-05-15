import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static requiredIf(d: AbstractControl,val: string | number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (d.value === String(val) && !c.value) {
                return { 'required': true };
            }
            return null;
        };
    }
}