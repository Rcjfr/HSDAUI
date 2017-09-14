import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
    selector: 'aa-search-by-maintenance',
    templateUrl: './search-by-maintenance.component.html',
    styleUrls: ['./search-by-maintenance.component.less']
})
export class SearchByMaintenanceComponent implements OnInit {
    @Output() update: EventEmitter<any> = new EventEmitter<any>();

    maintenanceForm = new FormGroup({
        lineMaintenance: new FormControl(),
        defectDiscoveredDuring: new FormControl(),
        unscheduledMaintenanceDescription: new FormControl(),
        routineNo: new FormControl(),
        nonRoutineNo: new FormControl(),
        micNo: new FormControl()

    });
    constructor() { }

    ngOnInit() {
        this.maintenanceForm.valueChanges.subscribe(this.update);
    }
    onMaintenanceChange(id: string, isChecked: boolean) {
        const defectDiscoveredArray = <FormArray>this.maintenanceForm.controls.defectDiscoveredDuring;

        if (isChecked) {
            defectDiscoveredArray.push(new FormControl(id));
        } else {
            defectDiscoveredArray.removeAt(defectDiscoveredArray.controls.findIndex(x => x.value === id));
        }
    }

}
