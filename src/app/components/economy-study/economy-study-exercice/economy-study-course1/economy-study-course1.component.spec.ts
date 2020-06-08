import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyCourse1Component } from './economy-study-course1.component';

describe('EconomyStudyCourse1Component', () => {
  let component: EconomyStudyCourse1Component;
  let fixture: ComponentFixture<EconomyStudyCourse1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyCourse1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyCourse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
