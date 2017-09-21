import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlsModule } from '../../common/components/form-controls.module';
import {
    SearchByAircraftComponent,
    SearchByCorrectiveActionComponent,
    SearchByCorrosionComponent,
    SearchByCpcpDispositionComponent,
    SearchByDateRangeComponent,
    SearchByDefectComponent,
    SearchByMaintenanceComponent,
    SearchByPartComponent,
    SearchBySdaFormComponent,
    SearchByStatusComponent,
    SearchOptionsComponent
} from './';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';
import { ToastrModule } from 'ngx-toastr';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';

describe('SearchFilterComponents', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchByAircraftComponent,
                SearchByCorrectiveActionComponent,
                SearchByCorrosionComponent,
                SearchByCpcpDispositionComponent,
                SearchByDateRangeComponent,
                SearchByDefectComponent,
                SearchByMaintenanceComponent,
                SearchByPartComponent,
                SearchBySdaFormComponent,
                SearchByStatusComponent,
                SearchOptionsComponent
            ],
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
                TypeaheadModule.forRoot(),
                NgPipesModule],
            providers: [{ provide: AppStateService, useClass: MockAppStateService }]
        }).compileComponents();
    }));

    xit('SearchByAircraftComponent should create', () => {
        expect(componentMaker(SearchByAircraftComponent)).toBeTruthy();
    });

    xit('SearchByCorrectiveActionComponent should create', () => {
        expect(componentMaker(SearchByCorrectiveActionComponent)).toBeTruthy();
    });

    xit('SearchByCorrosionComponent should create', () => {
        expect(componentMaker(SearchByCorrosionComponent)).toBeTruthy();
    });

    xit('SearchByCpcpDispositionComponent should create', () => {
        expect(componentMaker(SearchByCpcpDispositionComponent)).toBeTruthy();
    });

    xit('SearchByDateRangeComponent should create', () => {
        expect(componentMaker(SearchByDateRangeComponent)).toBeTruthy();
    });

    xit('SearchByDefectComponent should create', () => {
        expect(componentMaker(SearchByDefectComponent)).toBeTruthy();
    });

    xit('SearchByMaintenanceComponent should create', () => {
        expect(componentMaker(SearchByMaintenanceComponent)).toBeTruthy();
    });

    xit('SearchByPartComponent should create', () => {
        expect(componentMaker(SearchByPartComponent)).toBeTruthy();
    });

    xit('SearchBySdaFormComponent should create', () => {
        expect(componentMaker(SearchBySdaFormComponent)).toBeTruthy();
    });

    xit('SearchByStatusComponent should create', () => {
        expect(componentMaker(SearchByStatusComponent)).toBeTruthy();
    });

    xit('SearchOptionsComponent should create', () => {
        expect(componentMaker(SearchOptionsComponent)).toBeTruthy();
    });

    function componentMaker(componentName) {
        let component;
        try {
            const fixture = TestBed.createComponent(componentName);
            component = fixture.componentInstance;
            fixture.detectChanges();
        } catch (e) {
            component = undefined;
        }

        return component;
    }
});
