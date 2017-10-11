import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { ICorrosionLevel, IReasonForChange } from '../../../common/models';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilityService } from '../../../common/services';
import { IYesNoBoth } from '../../../common/models';
import * as _ from 'lodash';
@Component({
  selector: 'aa-search-by-cpcp-disposition',
  templateUrl: './search-by-cpcp-disposition.component.html',
  styleUrls: ['./search-by-cpcp-disposition.component.less']
})
export class SearchByCpcpDispositionComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  cpcpDispositionForm = new FormGroup({
    isNonCPCPRelatedEvent: new FormControl(''),
    isReviewComplete: new FormControl(''),
    isWideSpreadCorrosion: new FormArray([]),
    isCorrosionTaskNoCorrect: new FormControl(''),
    isCorrosionLevelCorrect: new FormControl(''),
    correctedCorrosionLevel: new FormArray([]),
    correctedCorrosionTaskNo: new FormControl(),
    corrosionLevelChangeReason: new FormControl(),
    engineeringComments: new FormControl(),
    qCFeedback: new FormControl(),
    submittedToQC: new FormControl(''),
    reviewer: new FormControl()
  });
  yesNoBothOptions$: Observable<IYesNoBoth[]>;
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  reasonsForChange$: Observable<List<IReasonForChange>>;
  constructor(private appStateService: AppStateService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.reasonsForChange$ = this.appStateService.getReasonsForChange();
    this.yesNoBothOptions$ = this.utilityService.getYesNoBothOptions();
    this.cpcpDispositionForm.valueChanges.subscribe(form => {
      form.corrosionLevelChangeReason = _.compact(form.corrosionLevelChangeReason);
      this.criteria.searchByCpcpDisposition = form;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      const corrosionArray = <FormArray>this.cpcpDispositionForm.controls.isWideSpreadCorrosion;

      if (changes.criteria.currentValue.searchByCpcpDisposition) {
        this.cpcpDispositionForm.patchValue(changes.criteria.currentValue.searchByCpcpDisposition, { emitEvent: false });
        while ((corrosionArray).length) {
          corrosionArray.removeAt(0);
        }
        //Repair Type checkboxes
        changes.criteria.currentValue.searchByCpcpDisposition.isWideSpreadCorrosion.forEach(element => {
          corrosionArray.push(new FormControl(element));
        });
      } else {
        this.cpcpDispositionForm.reset({
          isNonCPCPRelatedEvent: '',
          isReviewComplete: '',
          isCorrosionTaskNoCorrect: '',
          isCorrosionLevelCorrect: '',
          submittedToQC: ''
        }, { emitEvent: false });
        while ((corrosionArray).length) {
          corrosionArray.removeAt(0);
        }
      }
    }
  }

  onCpcpDispositionChange(id: string, isChecked: boolean) {
    const corrosionArray = <FormArray>this.cpcpDispositionForm.controls.isWideSpreadCorrosion;

    if (isChecked) {
      corrosionArray.push(new FormControl(id));
    } else {
      corrosionArray.removeAt(corrosionArray.controls.findIndex(x => x.value === id));
    }
  }
  cpcpDispositionContains(id) {
    if (_.includes(this.cpcpDispositionForm.controls.isWideSpreadCorrosion.value, id)) {
      return true;
    }

    return false;
  }
  onCorrectedCorrosionLevelChange(id: string, isChecked: boolean) {
    const corrosionArray = <FormArray>this.cpcpDispositionForm.controls.correctedCorrosionLevel;

    if (isChecked) {
      corrosionArray.push(new FormControl(id));
    } else {
      corrosionArray.removeAt(corrosionArray.controls.findIndex(x => x.value === id));
    }
  }

  correctedCorrosionLevelContains(id) {
    if (_.includes(this.cpcpDispositionForm.controls.correctedCorrosionLevel.value, id)) {
      return true;
    }

    return false;
  }
}
