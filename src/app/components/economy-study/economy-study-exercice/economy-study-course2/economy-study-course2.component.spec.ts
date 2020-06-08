import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyCourse2Component } from './economy-study-course2.component';

describe('EconomyStudyCourse2Component', () => {
  let component: EconomyStudyCourse2Component;
  let fixture: ComponentFixture<EconomyStudyCourse2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyCourse2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyCourse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
