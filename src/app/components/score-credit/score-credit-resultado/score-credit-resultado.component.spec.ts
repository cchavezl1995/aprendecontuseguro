
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCreditResultadoComponent } from './score-credit-resultado.component';

describe('ScoreCreditResultadoComponent', () => {
  let component: ScoreCreditResultadoComponent;
  let fixture: ComponentFixture<ScoreCreditResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCreditResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCreditResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
