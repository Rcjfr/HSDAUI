import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from "rxjs/ReplaySubject";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;
  public displayMessage: any = {}; // { [key: string]: any }
  @Input()
  set errorMessages(value) {
    this.displayMessage = value[this.formGroupName] || {};
  }
  constructor(public formGroupName: string) {

  }
  ngOnDestroy() {

  }
  ngOnInit() {
  }
}
