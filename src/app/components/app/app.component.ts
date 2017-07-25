import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../common/services';
import { Router, NavigationEnd } from '@angular/router';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appStateService: AppStateService, private router: Router, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.appStateService.loadLookupData();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  loadNewSda() {
    if (this.router.url.endsWith('alerts/new')) {
      // TODO: Need to find a better way
      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Confirm?',
        message: 'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.'
      }).subscribe((result) => {
        if (result) {
          this.appStateService.loadSda(0);
        }
      });

      return false;
    }

    this.router.navigate(['alerts', 'new']).then(result => {
      this.appStateService.loadSda(0);
    });

    return false;
  }
}
