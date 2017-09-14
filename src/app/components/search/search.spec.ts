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

describe('SearchFilterComponents', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchOptionsComponent, SearchByStatusComponent],
            imports: [
                ReactiveFormsModule,
                FormControlsModule,
                ToastrModule.forRoot({
                    timeOut: 800,
                    progressBar: true,
                    onActivateTick: true,
                    enableHtml: true,
                })],
            providers: [{ provide: AppStateService, useClass: MockAppStateService }]
        })
            .compileComponents();
    }));

    it('SearchByAircraftComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByAircraftComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByCorrectiveActionComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByCorrectiveActionComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByCorrosionComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByCorrosionComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByCpcpDispositionComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByCpcpDispositionComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByDateRangeComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByDateRangeComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByDefectComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByDefectComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByMaintenanceComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByMaintenanceComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByPartComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByPartComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchBySdaFormComponent should create', () => {
        const fixture = TestBed.createComponent(SearchBySdaFormComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchByStatusComponent should create', () => {
        const fixture = TestBed.createComponent(SearchByStatusComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('SearchOptionsComponent should create', () => {
        const fixture = TestBed.createComponent(SearchOptionsComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
