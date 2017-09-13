import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
import { FilterByPipe } from 'ng-pipes';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Rx';


@Component({
  selector: 'aa-search-by-sda-form',
  templateUrl: './search-by-sda-form.component.html',
  styleUrls: ['./search-by-sda-form.component.less']
})
export class SearchBySdaFormComponent implements OnInit, OnDestroy {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  departments$: Observable<List<models.IDepartment>>;
  stations$: Observable<models.IStation[]>;
  station: string;
  alertCodes$: Observable<List<models.IAlertCode>>;
  ATACodes$: Observable<List<models.IATACode>>;
  ATACodes: models.IATACode[];
  checkTypes$: Observable<List<models.ICheckType>>;
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
      .map(d => d && d.toJS())
      .subscribe(data => this.ATACodes = data);

    this.stations$ = Observable.create((observer: Observer<string>) => {
          observer.next(this.sdaForm.get('station').value);
        }).distinctUntilChanged()
          .switchMap(token => this.appStateService.getStations(token));

    this.alertCodes$ = this.appStateService.getAlertCodes();
    this.departments$ = this.appStateService.getDepartments();
    this.checkTypes$ = this.appStateService.getCheckTypes();
    this.sdaForm.valueChanges.subscribe(this.update);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.ataSubscription && this.ataSubscription.unsubscribe();
  }

  getAlertCode2s(alertCode1: string) {
    this.ataCodes2 = <models.IATACode[]>this.pipe.transform(this.ATACodes, ['primaryCode'], alertCode1);
  }
}
