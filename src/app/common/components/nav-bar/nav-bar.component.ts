import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
    isAdmin: boolean=false;
    dataReceived: boolean = false;
    appInfo: any = {};
    navCollapsed: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
