import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as models from '../../common/models';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() sda: models.ISda;
  @Input() parent: FormGroup;
  formGroup: FormGroup;
  protected subscriptions: Subscription[] = [];
  public Status = models.Status;
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

  public isSDAOpen(): boolean {
    return this.sda.status === models.Status.Open ||
      this.sda.status === models.Status.Rejected ||
      this.sda.status === models.Status.Deleted;
  }

  public checkSDAFormStatus(): boolean {
    if (!(this.sda.status === models.Status.Open || this.sda.status === models.Status.Rejected)) {
      this.parent.controls[this.formGroupName].disable();
      return true;
    }
    return false;
  }
}
