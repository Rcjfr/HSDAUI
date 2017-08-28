import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppStateService, AuthService } from '../../common/services';
import { Router, NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appStateService: AppStateService,
private authService: AuthService,
private router: Router,
private toastr: ToastsManager, private vcr: ViewContainerRef, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit(): void {
    this.appStateService.loadUser();
    this.appStateService.loadLookupData();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  loadNewSda() {
    this.router.navigate(['alerts', 'new']);
    this.appStateService.loadNewSda();

    return false;
  }
}
