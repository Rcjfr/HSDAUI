import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from "rxjs/Rx";
import { List } from "immutable";
import * as models from '../../common/models';
import { AppStateService } from '../../common/services';
@Component({
  selector: 'app-damage-tolerance-evaluation',
  templateUrl: './damage-tolerance-evaluation.component.html',
  styleUrls: ['./damage-tolerance-evaluation.component.less']
})
export class DamageToleranceEvaluationComponent extends BaseFormComponent implements OnInit {
  dteStatus$: Observable<List<models.IBaseLookUp>>;
  repairInspectionStatus$: Observable<List<models.IBaseLookUp>>;
  public uploader: FileUploader = new FileUploader({ url: '/api/attachments' });
  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('damageToleranceEvaluationGroup');
  }

  ngOnInit() {
    this.dteStatus$ = this.appStateService.getDTEStatus();
    this.repairInspectionStatus$ = this.appStateService.getRepairInspectionStatus();
    this.formGroup = this.fb.group({
      dteStatus: [1, []],
      repairInspectionStatus: [1, []],
      fatigueCritical: [null, []],
      stage1RTSDate: ['', []],
      duration: [6, []],
      stage2Date: ['', []],
      stage3Date: ['', []],
      srNo: ['', []],
      rdasNo: ['', []],
      etdNo: ['', []],
      esmSubItemNo: ['', []],
      thresholds: this.fb.array([this.initThreshold()]),
      monitorItems: this.fb.array([this.initMonitorItem()]),
      dteComments:['',[]]

    });
  }
  initThreshold() {
    return this.fb.group({
      inspectionThreshold: ['', []],
      repeatInterval: ['', []],
      inspectionMethod: ['', []]
    });
  }
  addThreshold() {
    let arr: FormArray = <FormArray>this.formGroup.get('thresholds');
    arr.push(this.initThreshold());
    return false;
  }
  initMonitorItem() {
    return this.fb.group({
      fmrLogPageMon: ['', []]
    });
  }
  addMonitorItem() {
    let arr: FormArray = <FormArray>this.formGroup.get('thresholds');
    arr.push(this.initMonitorItem());
    return false;
  }
}
