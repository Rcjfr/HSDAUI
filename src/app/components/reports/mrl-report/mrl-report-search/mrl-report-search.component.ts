import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
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
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Output, Input } from '@angular/core';
import { AppStateService, AuthService } from '@app/common/services';
import { IAircraftInfo, Status } from '@app/common/models';
import * as models from '@app/common/models';
import { Observable, Observer } from 'rxjs/Rx';
import { Expressions } from '@app/common/validators/generic-validator';
import { ISearchCriteria} from '@app/common/models/search/search-criteria.model';
import {ILazyLoadEvent} from '@app/common/models/lazy-load-event.model';

@Component({
  selector: 'aa-mrl-report-search',
  templateUrl: './mrl-report-search.component.html',
  styleUrls: ['./mrl-report-search.component.less']
})
export class MrlReportSearchComponent implements OnInit, OnDestroy {
  searchCriteria: ISearchCriteria = {};

    //Default paging options
    defaultPageSize = 10000;
    defaultSortColumn = 'createDate';
    defaultSortOrder = -1;

  mrlReportSearchForm: FormGroup;
  formSubmitted: boolean;
  @Output() onShowMrlPdf = new EventEmitter<ISearchCriteria>();
  @Output() onShowMrlExcel = new EventEmitter<ISearchCriteria>();
  loading$: Observable<boolean>;
  noseNumbers$: Observable<models.IAircraftInfo[]>;
  constructor(public appStateService: AppStateService) {
    this.mrlReportSearchForm = new FormGroup({
      dateFrom: new FormControl(),
      dateThrough: new FormControl(),
      aircraftNo: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]),
      monStatus: new FormControl()
    });

  }

  ngOnInit() {
    this.loading$ = this.appStateService.getSelectedAlertLoading();
    this.noseNumbers$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.mrlReportSearchForm.get('aircraftNo').value);
    })
      .switchMap(token => {
        this.appStateService.loadNoseNumbers(token);

        return this.appStateService.getNoseNumbers();
      });
  }

  getDefaultPageData(): ILazyLoadEvent {
    return {
      first: 0,
      rows: this.defaultPageSize,
      sortField: this.defaultSortColumn,
      sortOrder: this.defaultSortOrder
    }
  }
  showMrlreport(isExcel = false ) {
    this.formSubmitted = true;
    this.markAsDirty(this.mrlReportSearchForm);
    if (this.mrlReportSearchForm.valid) {
      this.searchCriteria.searchByAircraft = {aircraftNo: this.mrlReportSearchForm.controls.aircraftNo.value};
      this.searchCriteria.searchByDateRange = {dateFrom: this.mrlReportSearchForm.controls.dateFrom.value, dateThrough: this.mrlReportSearchForm.controls.dateThrough.value};
      this.searchCriteria.searchByCorrectiveAction = { isMajorRepair: 1 , deferralCode: this.mrlReportSearchForm.controls.monStatus.value ? 'MON' : null};
      this.searchCriteria.searchByStatus = { status: [Status.Closed] };
      this.searchCriteria.pageData = this.getDefaultPageData();
      if (isExcel) {
        this.onShowMrlExcel.emit(this.searchCriteria);
      } else {
        this.onShowMrlPdf.emit(this.searchCriteria);
      }
    }
  }


  ngOnDestroy() {
  }

  markAsDirty(group: FormGroup | FormArray) {
    group.markAsDirty();
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty();
      } else {
        this.markAsDirty(group.controls[i]);
      }
    }
  }

  noseValidator(): string {
    if (this.mrlReportSearchForm.get('aircraftNo').errors && this.formSubmitted || (this.mrlReportSearchForm.get('aircraftNo').errors &&
     (this.mrlReportSearchForm.get('aircraftNo').dirty || this.mrlReportSearchForm.get('aircraftNo').touched))) {
        if (this.mrlReportSearchForm.get('aircraftNo').errors.required) {
         return 'Aircraft Nose # is required.';
        }
        if (this.mrlReportSearchForm.get('aircraftNo').errors.maxlength) {
          return 'Aircraft Nose # must not be more than 5 characters.';
        }
        if (this.mrlReportSearchForm.get('aircraftNo').errors.pattern) {
          return 'Aircraft Nose # must contain only alphanumerics.';
        }

    }
  }

}
