import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilityService } from '../../../common/services';
import * as _ from 'lodash';

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
    yesNoBothOptions: {
        id: string;
        description: string;
    }[];

    constructor(private utilityService: UtilityService) { }

    ngOnInit() {
        this.yesNoBothOptions = this.utilityService.getYesNoBothOptions();
        this.maintenanceForm.valueChanges.subscribe(s => this.criteria.searchByMaintenance = s)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.criteria && changes.criteria.currentValue) {
            if (changes.criteria.currentValue.searchByMaintenance) {
                this.maintenanceForm.patchValue(changes.criteria.currentValue.searchByMaintenance, { emitEvent: false });

                //Maintenance type checkbox array
                const maintenanceTypeArray = <FormArray>this.maintenanceForm.controls.defectDiscoveredDuring;
                changes.criteria.currentValue.searchByMaintenance.defectDiscoveredDuring.forEach(element => {
                    maintenanceTypeArray.push(new FormControl(element));
                });
            } else {
                this.maintenanceForm.reset({lineMaintenance: ''}, { emitEvent: false });
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
