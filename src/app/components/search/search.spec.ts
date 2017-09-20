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
import { AppStateService, UtilityService } from '../../common/services';
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
            providers: [{ provide: AppStateService, useClass: MockAppStateService }, UtilityService]
        }).compileComponents();
    }));

    it('SearchByAircraftComponent should create', () => {
        expect(componentMaker(SearchByAircraftComponent)).toBeTruthy();
    });

    it('SearchByCorrectiveActionComponent should create', () => {
        expect(componentMaker(SearchByCorrectiveActionComponent)).toBeTruthy();
    });

    it('SearchByCorrosionComponent should create', () => {
        expect(componentMaker(SearchByCorrosionComponent)).toBeTruthy();
    });

    it('SearchByCpcpDispositionComponent should create', () => {
        expect(componentMaker(SearchByCpcpDispositionComponent)).toBeTruthy();
    });

    it('SearchByDateRangeComponent should create', () => {
        expect(componentMaker(SearchByDateRangeComponent)).toBeTruthy();
    });

    it('SearchByDefectComponent should create', () => {
        expect(componentMaker(SearchByDefectComponent)).toBeTruthy();
    });

    it('SearchByMaintenanceComponent should create', () => {
        expect(componentMaker(SearchByMaintenanceComponent)).toBeTruthy();
    });

    it('SearchByPartComponent should create', () => {
        expect(componentMaker(SearchByPartComponent)).toBeTruthy();
    });

    it('SearchBySdaFormComponent should create', () => {
        expect(componentMaker(SearchBySdaFormComponent)).toBeTruthy();
    });

    it('SearchByStatusComponent should create', () => {
        expect(componentMaker(SearchByStatusComponent)).toBeTruthy();
    });

    it('SearchOptionsComponent should create', () => {
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
