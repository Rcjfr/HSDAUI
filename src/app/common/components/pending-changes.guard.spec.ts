import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { PendingChangesGuard, ComponentCanDeactivate } from '@app/common/components/pending-changes.guard';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { cold, hot } from 'jasmine-marbles';
describe('Pending Changes Guard should', () => {
  let pendingChangesGuard: PendingChangesGuard;
  let dialogService: DialogService;
  let component: TestComponentWrapperComponent;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HttpModule],
      providers: [PendingChangesGuard, DialogService,
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    pendingChangesGuard = TestBed.get(PendingChangesGuard);
    dialogService = TestBed.get(DialogService);
    component = new TestComponentWrapperComponent();
  });

  it('be able to leave route when form is not dirty', () => {
    spyOn(dialogService, 'addDialog');
    component.formDirty = false;
    const ok = pendingChangesGuard.canDeactivate(component);
    expect(dialogService.addDialog).not.toHaveBeenCalled();
    expect(ok).toBe(true);
  });

  it('be not able to leave route when form is dirty', () => {
    const values = { a: true, b: false };
    spyOn(dialogService, 'addDialog').and.returnValue(of(false));

    //https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
    const expected = cold('(b|)', values);

    component.formDirty = true;
    const ok: Observable<boolean> = <Observable<boolean>>pendingChangesGuard.canDeactivate(component);
    expect(dialogService.addDialog).toHaveBeenCalled();
    expect(ok).toBeObservable(expected);
  });
});
@Component({
  selector: 'test-component-wrapper',
})
class TestComponentWrapperComponent implements ComponentCanDeactivate {
  public formDirty = false;
  canDeactivate(): Observable<boolean> | boolean {
    return !this.formDirty;
  }

}
