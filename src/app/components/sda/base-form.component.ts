import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import * as models from '../../common/models';
import { AuthService } from '../../common/services';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() sda: models.ISda;
  @Input() newSdaStus: models.Status;
  @Input() parent: FormGroup;
  formGroup: FormGroup;
  isQCPersonnel = false;
  protected subscriptions: Subscription[] = [];
  public Status = models.Status;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public displayMessage: any = {}; // { [key: string]: any }
  @Input()
  set errorMessages(value) {
    this.displayMessage = value[this.formGroupName] || {};
  }
  constructor(public formGroupName: string, public authService: AuthService) {
    this.subscriptions = [];
    this.authService.isQCPersonnel().take(1).subscribe(t => this.isQCPersonnel = t);
  }
  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);
    this.subscriptions.forEach(s => {
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
    return this.newSdaStus === models.Status.Open ||
      this.newSdaStus === models.Status.Rejected ||
      this.newSdaStus === models.Status.Deleted;
  }

  public checkSDAFormStatus(): boolean {
    const group = this.parent.controls[this.formGroupName];
    if (!(this.isQCPersonnel && this.sda.status === models.Status.Open || this.sda.status === models.Status.Rejected)) {
      group && group.disable();

      return true;
    }
    group && group.enable();

    return false;
  }
}
