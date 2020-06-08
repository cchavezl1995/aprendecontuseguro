import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSchedulingComponent } from './curriculum-scheduling.component';

describe('CurriculumSchedulingComponent', () => {
  let component: CurriculumSchedulingComponent;
  let fixture: ComponentFixture<CurriculumSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
