import { Component, OnInit } from '@angular/core';
import { AppStateService, AuthService } from '@app/common/services';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private appStateService: AppStateService,
    private authService: AuthService,
    private router: Router, private toastr: ToastrService
    ) {  }

  ngOnInit(): void {
    this.appStateService.loadUser();
    this.appStateService.loadLookupData();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.appStateService.getUser().filter(u => !!u)
      .subscribe(u => {
        this.authService.sessionTimeOut = u.sm_session_timeout;
        this.authService.idleThreshold = u.sm_idle_threshold;
        this.authService.keepAliveInterval = u.sm_keepalive_interval;
        this.authService.setupIdleTimer();
      });
  }

  loadNewSda() {
    this.router.navigate(['alerts', 'new']);
    this.appStateService.loadNewSda();

    return false;
  }
}
