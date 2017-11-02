import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IBaseLookUp, IYesNoBoth } from '../../../common/models'
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { decimalsNumberMask } from '../../../common/masks';
import * as _ from 'lodash';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'aa-search-by-dte',
  templateUrl: './search-by-dte.component.html',
  styleUrls: ['./search-by-dte.component.less']
})
export class SearchByDteComponent implements OnInit , OnChanges {
  @Input() criteria: any;

  dteForm = new FormGroup({
    dteStatus: new FormControl(),
    totalShipTimeFrom: new FormControl(),
    totalShipTimeTo: new FormControl(),
    cyclesFrom: new FormControl(),
    cyclesTo: new FormControl(),
    repairInspectionStatus: new FormControl(),
    isFatigueCritical: new FormControl(),
    stage1RTSDateFrom: new FormControl(),
    stage1RTSDateTo: new FormControl(),
    stage1Duration: new FormControl(),
    stage2DateFrom: new FormControl(),
    stage2DateTo: new FormControl(),
    stage3DateFrom: new FormControl(),
    Stage3DateTo: new FormControl(),
    srNumber: new FormControl(),
    rdasNumber: new FormControl(),
    etdNumber: new FormControl(),
    esmSubItemNumber: new FormControl(),
    inspectionThreshold: new FormControl(),
    inspectionInterval: new FormControl(),
    inspectionMethod: new FormControl(),
    monitorItemDescription: new FormControl(),
    comments: new FormControl(),
    qcFeedback: new FormControl(),
    submittedToQC: new FormControl(),
    updatedBy: new FormControl(),
    updatedDateFrom: new FormControl(),
    updatedDateTo: new FormControl(),
    dueDateFrom: new FormControl(),
    dueDateTo: new FormControl(),
    dueDateCompleted: new FormControl()
  })

  dteStatus: string[] = [];
  repairInspectionStatus: string[] = [];
  dteStatus$: Observable<List<models.IBaseLookUp>>;
  repInspStatus$: Observable<List<models.IBaseLookUp>>;
  data$: Observable<models.IBaseLookUp[]>;
  durationData$: Observable<models.IBaseLookUp[]>;
  submittedToQC$: Observable<models.IBaseLookUp[]>;

  decimalsNumberMask = decimalsNumberMask;
  public numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });
  constructor(private appStateService: AppStateService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.dteStatus$ = this.appStateService.getDTEStatus();
    this.repInspStatus$ = this.appStateService.getRepairInspectionStatus();
    this.data$ = Observable.of([{ id: 1, description: 'Yes' }, { id: 0, description: 'No' }]);
    this.submittedToQC$ = Observable.of([{ id: 1, description: 'Yes' }, { id: 0, description: 'No' }]);
    this.durationData$ = Observable.of([{ id: 6, description: '6' }, { id: 12, description: '12' }, { id: 18, description: '18' }, { id: 24, description: '24' }]);
    this.dteForm.valueChanges.subscribe(form => {
      //Remove any empty selections from the multi-select dropdowns
      form.dteStatus = _.compact(form.dteStatus);
      form.repairInspectionStatus = _.compact(form.repairInspectionStatus);
      form.isFatigueCritical = form.isFatigueCritical && form.isFatigueCritical.map(s => s === 1);
      form.submittedToQC = form.submittedToQC && form.submittedToQC.map(s => s === 1);
      this.criteria.searchByDTE = form;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByDTE) {
        //Date pickers parsing
        //Stage 1/RTS Date
        if (changes.criteria.currentValue.searchByDTE.stage1RTSDateFrom) {
          changes.criteria.currentValue.searchByDTE.stage1RTSDateFrom = new Date(changes.criteria.currentValue.searchByDTE.stage1RTSDateFrom);
        } else {
          changes.criteria.currentValue.searchByDTE.stage1RTSDateFrom = undefined;
        }

        if (changes.criteria.currentValue.searchByDTE.stage1RTSDateTo) {
          changes.criteria.currentValue.searchByDTE.stage1RTSDateTo = new Date(changes.criteria.currentValue.searchByDTE.stage1RTSDateTo);
        } else {
          changes.criteria.currentValue.searchByDTE.stage1RTSDateTo = undefined;
        }

        //Stage 2 Approval Date

        if (changes.criteria.currentValue.searchByDTE.stage2DateFrom) {
          changes.criteria.currentValue.searchByDTE.stage2DateFrom = new Date(changes.criteria.currentValue.searchByDTE.stage2DateFrom);
        } else {
          changes.criteria.currentValue.searchByDTE.stage2DateFrom = undefined;
        }

        if (changes.criteria.currentValue.searchByDTE.stage2DateTo) {
          changes.criteria.currentValue.searchByDTE.stage2DateTo = new Date(changes.criteria.currentValue.searchByDTE.stage2DateTo);
        } else {
          changes.criteria.currentValue.searchByDTE.stage2DateTo = undefined;
        }


        //Stage 3 Approval Date

        if (changes.criteria.currentValue.searchByDTE.stage3DateFrom) {
          changes.criteria.currentValue.searchByDTE.stage3DateFrom = new Date(changes.criteria.currentValue.searchByDTE.stage3DateFrom);
        } else {
          changes.criteria.currentValue.searchByDTE.stage3DateFrom = undefined;
        }

        if (changes.criteria.currentValue.searchByDTE.Stage3DateTo) {
          changes.criteria.currentValue.searchByDTE.Stage3DateTo = new Date(changes.criteria.currentValue.searchByDTE.Stage3DateTo);
        } else {
          changes.criteria.currentValue.searchByDTE.Stage3DateTo = undefined;
        }


        //Major Repair Updated Date

        if (changes.criteria.currentValue.searchByDTE.updatedDateFrom) {
          changes.criteria.currentValue.searchByDTE.updatedDateFrom = new Date(changes.criteria.currentValue.searchByDTE.updatedDateFrom);
        } else {
          changes.criteria.currentValue.searchByDTE.updatedDateFrom = undefined;
        }

        if (changes.criteria.currentValue.searchByDTE.updatedDateTo) {
          changes.criteria.currentValue.searchByDTE.updatedDateTo = new Date(changes.criteria.currentValue.searchByDTE.updatedDateTo);
        } else {
          changes.criteria.currentValue.searchByDTE.updatedDateTo = undefined;
        }
        //Due Date

        if (changes.criteria.currentValue.searchByDTE.dueDateFrom) {
          changes.criteria.currentValue.searchByDTE.dueDateFrom = new Date(changes.criteria.currentValue.searchByDTE.dueDateFrom);
        } else {
          changes.criteria.currentValue.searchByDTE.dueDateFrom = undefined;
        }

        if (changes.criteria.currentValue.searchByDTE.dueDateTo) {
          changes.criteria.currentValue.searchByDTE.dueDateTo = new Date(changes.criteria.currentValue.searchByDTE.dueDateTo);
        } else {
          changes.criteria.currentValue.searchByDTE.dueDateTo = undefined;
        }


        this.dteForm.patchValue(changes.criteria.currentValue.searchByDTE, { emitEvent: false });
      } else {
        this.dteForm.reset({}, { emitEvent: false });
      }
    }
  }

}
