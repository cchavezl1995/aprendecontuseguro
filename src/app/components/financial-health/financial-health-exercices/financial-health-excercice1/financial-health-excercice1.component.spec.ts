import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice1Component } from './financial-health-excercice1.component';

describe('FinancialHealthExcercice1Component', () => {
  let component: FinancialHealthExcercice1Component;
  let fixture: ComponentFixture<FinancialHealthExcercice1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
