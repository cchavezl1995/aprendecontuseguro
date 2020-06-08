import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice2Component } from './financial-health-excercice2.component';

describe('FinancialHealthExcercice2Component', () => {
  let component: FinancialHealthExcercice2Component;
  let fixture: ComponentFixture<FinancialHealthExcercice2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
