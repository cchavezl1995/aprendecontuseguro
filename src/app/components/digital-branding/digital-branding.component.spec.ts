import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBrandingComponent } from './digital-branding.component';

describe('DigitalBrandingComponent', () => {
  let component: DigitalBrandingComponent;
  let fixture: ComponentFixture<DigitalBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
