import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export abstract class SearchBaseFormComponent {
  @Input() model: any;
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected form: FormGroup;

  constructor(formGroup: FormGroup) {
    this.form = formGroup;
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }
}