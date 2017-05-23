import { Component, OnInit, Input, ViewChildren, ElementRef,
  ViewContainerRef, AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alert } from '../../common/models/alert.model';
import { ATACode } from '../../common/models/ata-code.model';
import { GenericValidator } from '../../common/validators/generic-validator';
import {ValidationMessages} from './alert-detail-view.messages';
import { FleetCheckType } from '../../common/models/check-type.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { IStation } from '../../common/models/station.model';


@Component({
  selector: 'app-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit {
  @Input() alert: Alert;
  @Input() ataCodes: ATACode[];
  @Input() checkTypes: FleetCheckType[];
  @Input() noseNumbers: string[];
  @Input() stations: IStation[];

  @Input() loading: boolean;

  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];
  sdaForm: FormGroup;

  // Use with the generic validation message class
  displayMessage = {};

  private genericValidator: GenericValidator;
  constructor(private vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private fb: FormBuilder, private elRef: ElementRef) {
      this.toastr.setRootViewContainerRef(vcr);
      this.genericValidator = new GenericValidator(ValidationMessages);

   }
ngAfterContentInit(): void {
  const frm = this.elRef.nativeElement.querySelector('form');
  const formElements = Array.prototype.slice.call(frm.querySelectorAll('input,select'));
     // Watch for the blur event from any input element on the form.
         const controlBlurs: Observable<any>[] = formElements
          .map((formControl: any) => {
              // console.log(new Date(),formControl.nativeElement.id);
            return Observable.fromEvent(formControl, 'blur');
            }
          );

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.sdaForm.valueChanges.debounceTime(400), ...controlBlurs)
            //.debounceTime(800)
            .subscribe(value => {
              console.log(value);
              this.displayMessage = this.genericValidator.processMessages(this.sdaForm); });
    }
  ngOnInit() {
        this.sdaForm = this.fb.group({});

  }
  saveAlert() {
        this.genericValidator.formSubmitted = true;
        this.displayMessage = this.genericValidator.processMessages(this.sdaForm);
        console.log(this.displayMessage);
        if (!this.sdaForm.valid) { return; }
        this.toastr.success('Details entered are valid', 'Success');
    }

}
