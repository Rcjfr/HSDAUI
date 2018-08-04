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
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';
@Component({
  selector: 'aa-twd-report-search',
  templateUrl: './twd-report-search.component.html',
  styleUrls: ['./twd-report-search.component.html']
})
export class TwdReportSearchComponent implements OnInit {
  searchCriteria: ISearchCriteria = {};
  fleet$: Observable<models.IBaseLookUp[]>;
  //Default paging options
  defaultPageSize = -1;
  defaultSortColumn = 'dueInDays';
  defaultSortOrder = 1;

  twdReportSearchForm: FormGroup;
formSubmitted: boolean;

@Output() onShowTwd = new EventEmitter<ISearchCriteria>();
@Output() onShowTwdPdf = new EventEmitter<ISearchCriteria>();
@Output() onShowTwdExcel = new EventEmitter<ISearchCriteria>();
loading$: Observable<boolean>;
noseNumbers$: Observable<models.IAircraftInfo[]>;
constructor( private dialogService: DialogService, public appStateService: AppStateService) {
  this.twdReportSearchForm = new FormGroup({
    fleet: new FormControl(''),
    aircraftNo: new FormControl('', [Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]),
  });

}

ngOnInit() {
  this.loading$ = this.appStateService.getSelectedAlertLoading();
  this.noseNumbers$ = Observable.create((observer: Observer<string>) => {
    observer.next(this.twdReportSearchForm.get('aircraftNo').value);
  })
    .switchMap(token => {
      this.appStateService.loadNoseNumbers(token);

      return this.appStateService.getNoseNumbers();
    });

    this.fleet$ = this.appStateService.getFleet();
    this.twdReportSearchForm.valueChanges.subscribe(form => {
    form.fleet = _.compact(form.fleet)
  })

}

getDefaultPageData(): ILazyLoadEvent {
  return {
    first: 0,
    rows: this.defaultPageSize,
    sortField: this.defaultSortColumn,
    sortOrder: this.defaultSortOrder
  }
}


showTwdReport(isExcel = false, isPdf = false) {

  this.formSubmitted = true;
  this.markAsDirty(this.twdReportSearchForm);
  if (this.twdReportSearchForm.valid) {
    if (this.twdReportSearchForm.controls.aircraftNo.value) {
      this.searchCriteria.searchByAircraft = { aircraftNo: this.twdReportSearchForm.controls.aircraftNo.value };
    }
    if (this.twdReportSearchForm.controls.fleet.value) {
      this.searchCriteria.searchBySda = { fleet: `${this.twdReportSearchForm.controls.fleet.value}*` };
    }
    this.searchCriteria.searchByDTE = {dteStatus: [1]};
    //this.searchCriteria.searchByCorrectiveAction = { isMajorRepair: 1}; //THIS IS THE DEFAULT FOR ANY SEARCHBYDTE SECTION
    this.searchCriteria.pageData = this.getDefaultPageData();
    if (isExcel) {
      this.onShowTwdExcel.emit(this.searchCriteria);
    } else if (isPdf) {
      this.onShowTwdPdf.emit(this.searchCriteria);
    } else {
      this.onShowTwd.emit(this.searchCriteria);
    }
  }
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
  if (this.twdReportSearchForm.get('aircraftNo').errors && this.formSubmitted || (this.twdReportSearchForm.get('aircraftNo').errors &&
   (this.twdReportSearchForm.get('aircraftNo').dirty || this.twdReportSearchForm.get('aircraftNo').touched))) {
      if (this.twdReportSearchForm.get('aircraftNo').errors.maxlength) {
        return 'Aircraft Nose # must not be more than 5 characters.';
      }
      if (this.twdReportSearchForm.get('aircraftNo').errors.pattern) {
        return 'Aircraft Nose # must contain only alphanumerics.';
      }
  }
}

}
