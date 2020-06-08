import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingSchedulingComponent } from './coworking-scheduling.component';

describe('CoworkingSchedulingComponent', () => {
  let component: CoworkingSchedulingComponent;
  let fixture: ComponentFixture<CoworkingSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoworkingSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkingSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
