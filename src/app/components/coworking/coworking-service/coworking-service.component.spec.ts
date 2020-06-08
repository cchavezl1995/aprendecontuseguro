import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingServiceComponent } from './coworking-service.component';

describe('CoworkingServiceComponent', () => {
  let component: CoworkingServiceComponent;
  let fixture: ComponentFixture<CoworkingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoworkingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
