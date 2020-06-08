import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice8Component } from './financial-health-excercice8.component';

describe('FinancialHealthExcercice8Component', () => {
  let component: FinancialHealthExcercice8Component;
  let fixture: ComponentFixture<FinancialHealthExcercice8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
