import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySchedulingComponent } from './security-scheduling.component';

describe('SecuritySchedulingComponent', () => {
  let component: SecuritySchedulingComponent;
  let fixture: ComponentFixture<SecuritySchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritySchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritySchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
