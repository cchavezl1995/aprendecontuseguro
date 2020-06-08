import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHealtServiceComponent } from './financial-healt-service.component';

describe('FinancialHealtServiceComponent', () => {
  let component: FinancialHealtServiceComponent;
  let fixture: ComponentFixture<FinancialHealtServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHealtServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHealtServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
