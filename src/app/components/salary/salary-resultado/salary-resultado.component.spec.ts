import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryResultadoComponent } from './salary-resultado.component';

describe('SalaryResultadoComponent', () => {
  let component: SalaryResultadoComponent;
  let fixture: ComponentFixture<SalaryResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
