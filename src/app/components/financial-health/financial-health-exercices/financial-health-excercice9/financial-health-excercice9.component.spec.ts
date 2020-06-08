import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice9Component } from './financial-health-excercice9.component';

describe('FinancialHealthExcercice9Component', () => {
  let component: FinancialHealthExcercice9Component;
  let fixture: ComponentFixture<FinancialHealthExcercice9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
