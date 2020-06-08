import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthComponent } from './financial-health.component';

describe('FinancialHealthComponent', () => {
  let component: FinancialHealthComponent;
  let fixture: ComponentFixture<FinancialHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
