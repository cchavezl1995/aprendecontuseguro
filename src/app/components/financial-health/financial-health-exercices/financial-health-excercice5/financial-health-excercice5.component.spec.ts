import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice5Component } from './financial-health-excercice5.component';

describe('FinancialHealthExcercice5Component', () => {
  let component: FinancialHealthExcercice5Component;
  let fixture: ComponentFixture<FinancialHealthExcercice5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
