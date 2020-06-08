import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealthExercicesComponent } from './financial-health-exercices.component';

describe('FinancialHealthExercicesComponent', () => {
  let component: FinancialHealthExercicesComponent;
  let fixture: ComponentFixture<FinancialHealthExercicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealthExercicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealthExercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
