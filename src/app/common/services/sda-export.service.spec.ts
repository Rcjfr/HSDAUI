import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';
import { SdaService } from '@app/common/services/sda.service';
import { SdaExportService } from './sda-export.service';
import { AuthService } from '@app/common/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
describe('SdaExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }, AuthService,
        SdaService, SdaExportService],
      imports: [
        RouterTestingModule,
        HttpModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([SdaExportService], (service: SdaExportService) => {
    expect(service).toBeTruthy();
  }));
});