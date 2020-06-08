import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice6Component } from './financial-health-excercice6.component';

describe('FinancialHealthExcercice6Component', () => {
  let component: FinancialHealthExcercice6Component;
  let fixture: ComponentFixture<FinancialHealthExcercice6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
