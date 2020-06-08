import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryServiceComponent } from './salary-service.component';

describe('SalaryServiceComponent', () => {
  let component: SalaryServiceComponent;
  let fixture: ComponentFixture<SalaryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
