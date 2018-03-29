import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from '@app/common/services';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilityService } from '@app/common/services';
import { IYesNoBoth, IBaseLookUp } from '@app/common/models';
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
    isWideSpreadCorrosion: new FormControl(''),
    isCorrosionTaskNoCorrect: new FormControl(''),
    isCorrosionLevelCorrect: new FormControl(''),
    correctedCorrosionLevel: new FormControl([]),
    correctedCorrosionTaskNo: new FormControl(),
    corrosionLevelChangeReason: new FormControl(),
    engineeringComments: new FormControl(),
    qCFeedback: new FormControl(),
    submittedToQC: new FormControl(''),
    reviewer: new FormControl()
  });
  yesNoBothOptions$: Observable<IYesNoBoth[]>;
  corrosionLevels$: Observable<IBaseLookUp[]>;
  reasonsForChange$: Observable<IBaseLookUp[]>;
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
      if (changes.criteria.currentValue.searchByCpcpDisposition) {
        this.cpcpDispositionForm.patchValue(changes.criteria.currentValue.searchByCpcpDisposition, { emitEvent: false });
      } else {
        this.cpcpDispositionForm.reset({
          isNonCPCPRelatedEvent: '',
          isReviewComplete: '',
          isWideSpreadCorrosion: '',
          isCorrosionTaskNoCorrect: '',
          isCorrosionLevelCorrect: '',
          submittedToQC: '',
          correctedCorrosionLevel: []
        }, { emitEvent: false });
      }
    }
  }
}
