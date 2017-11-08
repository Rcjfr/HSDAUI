import { CauseOfDamageGroupComponent } from './cause-of-damage-group.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SdaFormModule } from '@app/components/sda/sda-form.module';
import * as models from '@app/common/models';
import { CustomValidators } from '@app/common/validators/custom-validators';


describe('CauseOfDamageDescriptionComponent', () => {
    let component: CauseOfDamageGroupComponent;
    let fixture: ComponentFixture<CauseOfDamageGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ReactiveFormsModule, FormControlsModule, SdaFormModule],
            providers: [{ provide: AppStateService, useClass: MockAppStateService }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CauseOfDamageGroupComponent);
        component = component = fixture.componentInstance;

        //Inputs
        component.parent = new FormGroup({});
        component.sda = {};
        component.newSdaStus = models.Status.Open;

        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
