import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
import { FilterByPipe } from 'ng-pipes';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Rx';
import { SearchBaseFormComponent } from '../search-base-form.component';


@Component({
  selector: 'aa-search-by-sda-form',
  templateUrl: './search-by-sda-form.component.html',
  styleUrls: ['./search-by-sda-form.component.less']
})
export class SearchBySdaFormComponent extends SearchBaseFormComponent implements OnInit, OnDestroy {
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

  constructor(private formBuilder: FormBuilder, private appStateService: AppStateService) {
    super(formBuilder.group({
      'sdrId': [undefined, Validators.required],
      'station': [undefined, Validators.required],
      'alertCode': [undefined, Validators.required],
      'sdrNumber': [undefined, Validators.required],
      'department': [undefined, Validators.required],
      'ataCode1': [undefined, Validators.required],
      'originator': [undefined, Validators.required],
      'ataCode2': [undefined, Validators.required],
      'fleet': [undefined, Validators.required],
      'checkType': [undefined, Validators.required]
    }));
  }

  ngOnInit() {
    this.alertCodes$ = this.appStateService.getAlertCodes();
    this.ataSubscription = this.appStateService.getATACodes()
      .map(d => d && d.toJS())
      .subscribe(data => this.ATACodes = data);
    this.departments$ = this.appStateService.getDepartments();
    this.stations$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.station);
    })
      .distinctUntilChanged()
      .switchMap(token => this.appStateService.getStations(token));
    this.checkTypes$ = this.appStateService.getCheckTypes();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.ataSubscription && this.ataSubscription.unsubscribe();
  }

  getAlertCode2s(alertCode1: string) {
    this.ataCodes2 = <models.IATACode[]>this.pipe.transform(this.ATACodes, ['primaryCode'], alertCode1);
  }
}