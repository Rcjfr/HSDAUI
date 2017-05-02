import { Component, OnInit } from '@angular/core';
import { ATACodesService } from '../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { ATACode } from '../common/models/ata-code.model';
import { Alert } from '../common/models/alert.model';
import { ICheckboxState } from '../common/directives/checkbox/checkbox.interfaces';

@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.less'],
  providers: [ATACodesService]
})
export class AlertDetailComponent implements OnInit {
ataCodes$: Observable<Array<ATACode>>;
ataCode1s$: Observable<Array<string>>;
ataCode2s$: Observable<Array<string>>;
alert: Alert;
lineMaintenance: ICheckboxState= { isChecked: false };
lineMaintenanceLabel= 'Line Maintenance';


  constructor(private service: ATACodesService) { }

  ngOnInit() {
    this.ataCodes$ = this.service.getATACodes();
    this.ataCode1s$ = this.ataCodes$.map(d => d.map(alertCode => alertCode.Code));
    this.alert = <Alert>{alertCode:'',ataCode1:'',ataCode2:'',lineMaintenance:false};
  }

  getAlertCode2s(alertCode1: string) {
       this.ataCode2s$ = this.ataCodes$.map(a => a.find(b => b.Code === alertCode1).Codes.map(b => b.Code));
  }


}
