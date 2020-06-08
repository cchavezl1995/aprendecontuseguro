import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExcercice3Component } from './financial-health-excercice3.component';

describe('FinancialHealthExcercice3Component', () => {
  let component: FinancialHealthExcercice3Component;
  let fixture: ComponentFixture<FinancialHealthExcercice3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExcercice3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExcercice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
