import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingIttComponent } from './scheduling-itt.component';

describe('SchedulingIttComponent', () => {
  let component: SchedulingIttComponent;
  let fixture: ComponentFixture<SchedulingIttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingIttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingIttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
