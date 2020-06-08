import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingFraudeComponent } from './scheduling-fraude.component';

describe('SchedulingFraudeComponent', () => {
  let component: SchedulingFraudeComponent;
  let fixture: ComponentFixture<SchedulingFraudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingFraudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingFraudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
