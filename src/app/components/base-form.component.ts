import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as models from '../common/models';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() sda: models.ISda;
  @Input() parent: FormGroup;
  formGroup: FormGroup;
  protected subscriptions: Subscription[] = [];
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public displayMessage: any = {}; // { [key: string]: any }
  @Input()
  set errorMessages(value) {
    this.displayMessage = value[this.formGroupName] || {};
  }
  constructor(public formGroupName: string) {
    this.subscriptions = [];
  }
  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);
    this.subscriptions.forEach(s => {
      //console.log(s);
      s && s.unsubscribe();
    });
  }
  ngAfterViewInit() {
    Observable.merge(...this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur')))
      .subscribe(v => {

        this.parent.markAsDirty();
        this.parent.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      });
  }
  ngOnInit() {

  }
}
