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
import { Alert } from '../../common/models/alert.model';
import { GenericValidator } from '../../common/validators/generic-validator';
import { ValidationMessages } from './alert-detail-view.messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';




@Component({
  selector: 'app-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit {
  @Input() alert: Alert;
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
    Observable.merge(this.sdaForm.valueChanges, // debounceTime(400)
      ...controlBlurs)
      // .debounceTime(400)
      .mapTo(-1)
      .subscribe(value => {
        this.displayMessage$.next(this.genericValidator.processMessages(this.sdaForm));
      });

  }
  ngOnInit() {
    this.sdaForm = this.fb.group({});

  }
  saveAlert() {
    this.genericValidator.formSubmitted = true;
    this.markAsDirty(this.sdaForm);
    this.displayMessage$.next(this.genericValidator.processMessages(this.sdaForm));
    if (!this.sdaForm.valid) { return; }
    this.toastr.success('Details entered are valid', 'Success');
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
