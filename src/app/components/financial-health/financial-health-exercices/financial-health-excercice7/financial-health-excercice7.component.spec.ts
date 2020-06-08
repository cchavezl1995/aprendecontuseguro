import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice7Component } from './financial-health-excercice7.component';

describe('FinancialHealthExcercice7Component', () => {
  let component: FinancialHealthExcercice7Component;
  let fixture: ComponentFixture<FinancialHealthExcercice7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
