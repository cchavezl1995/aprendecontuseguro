import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBrandingSchedulingComponent } from './digital-branding-scheduling.component';

describe('DigitalBrandingSchedulingComponent', () => {
  let component: DigitalBrandingSchedulingComponent;
  let fixture: ComponentFixture<DigitalBrandingSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalBrandingSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalBrandingSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
