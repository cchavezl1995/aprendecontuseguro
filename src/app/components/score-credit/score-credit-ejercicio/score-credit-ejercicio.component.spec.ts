import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCreditEjercicioComponent } from './score-credit-ejercicio.component';

describe('ScoreCreditEjercicioComponent', () => {
  let component: ScoreCreditEjercicioComponent;
  let fixture: ComponentFixture<ScoreCreditEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCreditEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCreditEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
