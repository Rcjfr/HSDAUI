import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';


export const atLeastOne = (validator: ValidatorFn) => (group: FormGroup, ): ValidationErrors | null => {
  const hasAtLeastOne = group && group.controls && Object.keys(group.controls).some(k => !validator(group.controls[k]));

  return hasAtLeastOne ? null : {
    atLeastOne: {
      valid: false
    }
  };
};

export abstract class SearchBaseFormComponent {
  @Input() model: any;
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected form: FormGroup;

  constructor(formGroup: FormGroup) {
    this.form = formGroup;
    this.form.validator = atLeastOne(Validators.required);

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }
}
