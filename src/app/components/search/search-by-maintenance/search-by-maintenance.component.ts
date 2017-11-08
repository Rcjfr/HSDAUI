import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilityService } from '@app/common/services';
import { IYesNoBoth } from '@app/common/models';
import * as _ from 'lodash';
import * as models from '@app/common/models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'aa-search-by-maintenance',
    templateUrl: './search-by-maintenance.component.html',
    styleUrls: ['./search-by-maintenance.component.less']
})
export class SearchByMaintenanceComponent implements OnInit, OnChanges {
    @Input() criteria: any;

    maintenanceForm = new FormGroup({
        lineMaintenance: new FormControl(''),
        defectDiscoveredDuring: new FormArray([]),
        unscheduledMaintenanceDescription: new FormControl(),
        routineNo: new FormControl(),
        nonRoutineNo: new FormControl(),
        micNo: new FormControl()

    });
    yesNoBothOptions$: Observable<IYesNoBoth[]>;
    lineMaintenance: string[] = [];

    constructor(private utilityService: UtilityService) { }

    ngOnInit() {
        this.yesNoBothOptions$ = this.utilityService.getYesNoBothOptions();
      this.maintenanceForm.valueChanges.subscribe(s => this.criteria.searchByMaintenance = s)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.criteria && changes.criteria.currentValue) {
            const maintenanceTypeArray = <FormArray>this.maintenanceForm.controls.defectDiscoveredDuring;

            if (changes.criteria.currentValue.searchByMaintenance) {
                this.maintenanceForm.patchValue(changes.criteria.currentValue.searchByMaintenance, { emitEvent: false });
                //FormArray values are not clearing properly after reset()/patch(), see: https://github.com/angular/angular/pull/11051
                while ((maintenanceTypeArray).length) {
                    maintenanceTypeArray.removeAt(0);
                }

                //Maintenance type checkbox array
                changes.criteria.currentValue.searchByMaintenance.defectDiscoveredDuring.forEach(element => {
                    maintenanceTypeArray.push(new FormControl(element));
                });
            } else {
                this.maintenanceForm.reset({ lineMaintenance: '' }, { emitEvent: false });
                //FormArray values are not clearing properly after reset()/patch(), see: https://github.com/angular/angular/pull/11051
                while ((maintenanceTypeArray).length) {
                    maintenanceTypeArray.removeAt(0);
                }
            }
        }
    }

    onMaintenanceChange(id: string, isChecked: boolean) {
        const maintenanceTypeArray = <FormArray>this.maintenanceForm.controls.defectDiscoveredDuring;
        if (isChecked) {
            maintenanceTypeArray.push(new FormControl(id));
        } else {
            maintenanceTypeArray.removeAt(maintenanceTypeArray.controls.findIndex(x => x.value === id));
        }
    }

    maintenanceContains(id) {
        if (_.includes(this.maintenanceForm.controls.defectDiscoveredDuring.value, id)) {
            return true;
        }

        return false;
    }
}
