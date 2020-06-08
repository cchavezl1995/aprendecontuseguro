import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCreditComponent } from './score-credit.component';

describe('ScoreCreditComponent', () => {
  let component: ScoreCreditComponent;
  let fixture: ComponentFixture<ScoreCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
