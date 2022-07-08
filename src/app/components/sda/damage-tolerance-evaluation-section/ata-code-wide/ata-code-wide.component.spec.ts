import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaCodeWideComponent } from './ata-code-wide.component';

describe('AtaCodeWideComponent', () => {
  let component: AtaCodeWideComponent;
  let fixture: ComponentFixture<AtaCodeWideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaCodeWideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaCodeWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
