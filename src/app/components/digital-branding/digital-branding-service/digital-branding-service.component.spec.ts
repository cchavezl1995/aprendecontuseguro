import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBrandingServiceComponent } from './digital-branding-service.component';

describe('DigitalBrandingServiceComponent', () => {
  let component: DigitalBrandingServiceComponent;
  let fixture: ComponentFixture<DigitalBrandingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalBrandingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalBrandingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
