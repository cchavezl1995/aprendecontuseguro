import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyExerciceComponent } from './economy-study-exercice.component';

describe('EconomyStudyExerciceComponent', () => {
  let component: EconomyStudyExerciceComponent;
  let fixture: ComponentFixture<EconomyStudyExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
