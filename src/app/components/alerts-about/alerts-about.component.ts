import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'aa-alerts-about',
  templateUrl: './alerts-about.component.html',
  styleUrls: ['./alerts-about.component.less']
})
export class AlertsAboutComponent implements OnInit {
  public appVersion$: Observable<any>;
  constructor(private http: HttpClient ) { }

  ngOnInit() {
    this.appVersion$ = this.http.get('assets/app-version.json');
  }
}
