import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aa-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
    isAdmin = false;
    dataReceived = false;
    appInfo: any = {};
    navCollapsed = false;
}
