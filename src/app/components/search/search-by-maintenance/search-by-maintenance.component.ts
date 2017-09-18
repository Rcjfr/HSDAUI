import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilityService } from '../../../common/services';
@Component({
    selector: 'aa-search-by-maintenance',
    templateUrl: './search-by-maintenance.component.html',
    styleUrls: ['./search-by-maintenance.component.less']
})
export class SearchByMaintenanceComponent implements OnInit {
    @Output() update: EventEmitter<any> = new EventEmitter<any>();

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
        //this.yesNoOptions = [
        //    { id: '1', description: 'Yes' },
        //    { id: '0', description: 'No' },
        //    { id: '2', description: 'Both' }
        //];
        this.yesNoBothOptions = this.utilityService.getYesNoOptions();
        this.maintenanceForm.valueChanges.subscribe(this.update);
    }
    onMaintenanceChange(id: string, isChecked: boolean) {
        const maintenanceTypeArray = <FormArray>this.maintenanceForm.controls.defectDiscoveredDuring;
        if (isChecked) {
            maintenanceTypeArray.push(new FormControl(id));
        } else {
            maintenanceTypeArray.removeAt(maintenanceTypeArray.controls.findIndex(x => x.value === id));
        }
       // console.log(maintenanceTypeArray);
    }

}
