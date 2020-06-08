import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBrandingFormComponent } from './digital-branding-form.component';

describe('DigitalBrandingFormComponent', () => {
  let component: DigitalBrandingFormComponent;
  let fixture: ComponentFixture<DigitalBrandingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalBrandingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalBrandingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
