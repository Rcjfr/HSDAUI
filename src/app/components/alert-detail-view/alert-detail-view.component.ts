import {
  Component, OnInit, Input, ViewChildren, ElementRef,
  ViewContainerRef, AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild, AfterContentInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { IAlert } from '../../common/models/alert.model';
import { GenericValidator } from '../../common/validators/generic-validator';
import { ValidationMessages } from './alert-detail-view.messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'aa-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit {
  @Input() alert: IAlert;
  @Input() loading: boolean;

  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];
  sdaForm: FormGroup;

  // Use with the generic validation message class
  displayMessage$ = new BehaviorSubject<any>({});

  private genericValidator: GenericValidator;
  constructor(private toastr: ToastsManager,
    private fb: FormBuilder, private elRef: ElementRef) {
    this.genericValidator = new GenericValidator(ValidationMessages);

  }
  ngAfterContentInit(): void {
    const frm = this.elRef.nativeElement.querySelector('form');
    const formElements = Array.prototype.slice.call(frm.querySelectorAll('input,select,textarea'));
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = formElements
      .map((formControl: any) => {
        return Observable.fromEvent(formControl, 'blur');
      }
      );

    // Merge the blur event observable with the valueChanges observable
    //Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges, ...controlBlurs)
    Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges)
              .mapTo(1)
              .throttleTime(500)
              .subscribe(value => {
                const messages = this.genericValidator.processMessages(this.sdaForm);
                //console.log('Validating...', messages);
                this.displayMessage$.next(messages);
              });

  }
  ngOnInit() {
    this.sdaForm = this.fb.group({});

  }
  saveAlert() {
    this.genericValidator.formSubmitted = true;
    this.markAsDirty(this.sdaForm);
    this.displayMessage$.next(this.genericValidator.processMessages(this.sdaForm));
    if (!this.sdaForm.valid) {
      this.logErrors(this.sdaForm);
      return;
    }
    this.toastr.success('Details entered are valid', 'Success');
  }

  logErrors(group: FormGroup | FormArray) {

    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        if (group.controls[i].errors) { console.log(i, group.controls[i].errors); }
        // if(group.controls[i].invalid){
        //   console.log(group.controls[i]);
        // }
      } else {
        this.logErrors(group.controls[i]);
      }
    }
  }

  markAsDirty(group: FormGroup | FormArray) {
    group.markAsDirty();
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty();
        // if(group.controls[i].invalid){
        //   console.log(group.controls[i]);
        // }
      } else {
        this.markAsDirty(group.controls[i]);
      }
    }
  }
}