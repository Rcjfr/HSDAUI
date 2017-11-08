import { Component, OnInit, OnDestroy, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AppStateService } from '@app/common/services';
import { FilterByPipe } from 'ng-pipes';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Rx';


@Component({
  selector: 'aa-search-by-sda-form',
  templateUrl: './search-by-sda-form.component.html',
  styleUrls: ['./search-by-sda-form.component.less']
})
export class SearchBySdaFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() criteria: any;

  departments$: Observable<models.IBaseLookUp[]>;
  stations$: Observable<models.IStation[]>;
  station: string;
  alertCodes$: Observable<models.IBaseLookUp[]>;
  ATACodes$: Observable<models.IATACode[]>;
  ATACodes: models.IATACode[];
  checkTypes$: Observable<models.ICheckType[]>;
  ataCodes2: models.IATACode[];
  pipe = new FilterByPipe();
  ataSubscription: Subscription;

  sdaForm = new FormGroup({
    id: new FormControl(),
    station: new FormControl(),
    alertCode: new FormControl(''),
    sdrNumber: new FormControl(),
    department: new FormControl(''),
    ataCode1: new FormControl(''),
    ataCode2: new FormControl(''),
    originator: new FormControl(),
    fleet: new FormControl(),
    checkType: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, private appStateService: AppStateService) { }

  ngOnInit() {
    this.ataSubscription = this.appStateService.getATACodes()
      .subscribe(data => this.ATACodes = data);

    this.stations$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.sdaForm.get('station').value);
    }).distinctUntilChanged()
      .switchMap(token => this.appStateService.getStations(token));

    this.alertCodes$ = this.appStateService.getAlertCodes();
    this.departments$ = this.appStateService.getDepartments();
    this.checkTypes$ = this.appStateService.getCheckTypes();
    this.sdaForm.valueChanges.subscribe(s => this.criteria.searchBySda = s)
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.ataSubscription && this.ataSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchBySda) {
        this.sdaForm.patchValue(changes.criteria.currentValue.searchBySda, { emitEvent: false });

        //Handle ATA Codes
        if (changes.criteria.currentValue.searchBySda.ataCode1) {
          this.loadAtaCodes2(changes.criteria.currentValue.searchBySda.ataCode1);

          if (changes.criteria.currentValue.searchBySda.ataCode2) {
            this.sdaForm.patchValue({ ataCode2: changes.criteria.currentValue.searchBySda.ataCode2 }, { emitEvent: false });
          }
        }
      } else {
        this.sdaForm.reset({
          alertCode: '',
          department: '',
          ataCode1: '',
          ataCode2: '',
          checkType: ''
        }, { emitEvent: false });
      }
    }
  }

  onAlertCode1Change(alertCode1: string) {
    this.loadAtaCodes2(alertCode1);
    this.sdaForm.controls['ataCode2'].setValue('');
  }

  loadAtaCodes2(alertCode1: string) {
    this.ataCodes2 = <models.IATACode[]>this.pipe.transform(this.ATACodes, ['primaryCode'], alertCode1);
  }
}
