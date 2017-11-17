import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlsModule } from 'app/common/components/form-controls.module';
import { AppStateService, UtilityService } from 'app/common/services';
import { MockAppStateService } from 'app/common/services/mocks/mock-app-state.service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { SearchByDteComponent } from './search-by-dte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';
import { InjectionToken, SimpleChanges } from '@angular/core';


describe('SearchByDteComponent', () => {
  let component: SearchByDteComponent;
  let fixture: ComponentFixture<SearchByDteComponent>;


  // tslint:disable-next-line:max-line-length
  const data = JSON.parse('{"criteria":{"previousValue":{"searchByDateRange":{},"searchByDTE":{"dteStatus":[],"totalShipTimeFrom":null,"totalShipTimeTo":null,"cyclesFrom":null,"cyclesTo":null,"repairInspectionStatus":[],"isFatigueCritical":null,"stage1Duration":null,"srNumber":null,"rdasNumber":null,"etdNumber":null,"esmSubItemNumber":null,"inspectionThreshold":null,"inspectionInterval":null,"inspectionMethod":null,"monitorItemDescription":null,"comments":null,"qcFeedback":null,"submittedToQC":null,"updatedBy":null,"dueDateCompleted":null}},"currentValue":{"searchByDTE":{"dteStatus":[1],"totalShipTimeFrom":"0","totalShipTimeTo":"50000","cyclesFrom":"100","cyclesTo":"10000","repairInspectionStatus":[1,2],"isFatigueCritical":[true,false],"stage1RTSDateFrom":"2017-10-01T07:00:00.000Z","stage1RTSDateTo":"2017-12-01T07:00:00.000Z","stage1Duration":[6,18,24,12],"stage2DateFrom":"2017-10-01T07:00:00.000Z","stage2DateTo":"2017-11-01T07:00:00.000Z","stage3DateFrom":"2017-10-01T07:00:00.000Z","Stage3DateTo":"2017-11-02T07:00:00.000Z","srNumber":"","rdasNumber":null,"etdNumber":null,"esmSubItemNumber":null,"inspectionThreshold":null,"inspectionInterval":null,"inspectionMethod":null,"monitorItemDescription":null,"comments":null,"qcFeedback":null,"submittedToQC":[true,false],"updatedBy":null,"updatedDateFrom":"2017-10-01T07:00:00.000Z","updatedDateTo":"2017-11-01T07:00:00.000Z","dueDateFrom":"2017-10-03T07:00:00.000Z","dueDateTo":"2017-11-03T07:00:00.000Z","dueDateCompleted":true},"searchByDateRange":{}},"firstChange":false}}');


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDteComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        ToastrModule.forRoot({
          timeOut: 800,
          progressBar: true,
          onActivateTick: true,
          enableHtml: true,
        }),
        NKDatetimeModule,
        NgPipesModule, TextMaskModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDteComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });



  it('SearchByDteComponent should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render the dte values', () => {

   component.ngOnChanges(data);
   component.dteForm.controls['totalShipTimeFrom'].setValue(100);
   fixture.detectChanges();
   expect(component).toBeTruthy();
   expect(component.dteForm.get('dteStatus').value).toContain(1);
   expect(component.dteForm.get('totalShipTimeFrom').value).toBe(100);
   expect(component.dteForm.get('totalShipTimeTo').value).toBe('50000');

   //console.log
   expect(component.dteForm.get('stage1RTSDateFrom').value).toEqual(new Date('2017-10-01T07:00:00.000Z'));
   expect(component.dteForm.get('stage1RTSDateTo').value).toEqual(new Date('2017-12-01T07:00:00.000Z'));


   expect(component.dteForm.get('stage2DateFrom').value).toEqual(new Date('2017-10-01T07:00:00.000Z'));
   expect(component.dteForm.get('stage2DateTo').value).toEqual(new Date('2017-11-01T07:00:00.000Z'));

   expect(component.dteForm.get('stage3DateFrom').value).toEqual(new Date('2017-10-01T07:00:00.000Z'));
   expect(component.dteForm.get('Stage3DateTo').value).toEqual(new Date('2017-11-02T07:00:00.000Z'));


   expect(component.dteForm.get('stage3DateFrom').value).toEqual(new Date('2017-10-01T07:00:00.000Z'));
   expect(component.dteForm.get('Stage3DateTo').value).toEqual(new Date('2017-11-02T07:00:00.000Z'));

   expect(component.dteForm.get('updatedDateFrom').value).toEqual(new Date('2017-10-01T07:00:00.000Z'));
   expect(component.dteForm.get('updatedDateTo').value).toEqual(new Date('2017-11-01T07:00:00.000Z'));


  });

});
