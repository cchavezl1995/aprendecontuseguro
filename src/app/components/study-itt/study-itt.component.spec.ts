import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyIttComponent } from './study-itt.component';

describe('StudyIttComponent', () => {
  let component: StudyIttComponent;
  let fixture: ComponentFixture<StudyIttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyIttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyIttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
