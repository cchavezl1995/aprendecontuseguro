import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice4Component } from './financial-health-excercice4.component';

describe('FinancialHealthExcercice4Component', () => {
  let component: FinancialHealthExcercice4Component;
  let fixture: ComponentFixture<FinancialHealthExcercice4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
