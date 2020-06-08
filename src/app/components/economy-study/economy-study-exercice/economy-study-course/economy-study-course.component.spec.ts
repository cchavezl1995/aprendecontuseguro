import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyCourseComponent } from './economy-study-course.component';

describe('EconomyStudyCourseComponent', () => {
  let component: EconomyStudyCourseComponent;
  let fixture: ComponentFixture<EconomyStudyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
