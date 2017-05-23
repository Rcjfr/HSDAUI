import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaCodeComponent } from './ata-code.component';

describe('AtaCodeComponent', () => {
  let component: AtaCodeComponent;
  let fixture: ComponentFixture<AtaCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
