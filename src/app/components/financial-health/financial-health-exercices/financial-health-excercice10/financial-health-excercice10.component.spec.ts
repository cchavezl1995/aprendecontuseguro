import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice10Component } from './financial-health-excercice10.component';

describe('FinancialHealthExcercice10Component', () => {
  let component: FinancialHealthExcercice10Component;
  let fixture: ComponentFixture<FinancialHealthExcercice10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
