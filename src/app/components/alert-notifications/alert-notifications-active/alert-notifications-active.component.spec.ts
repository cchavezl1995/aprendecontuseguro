import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationsActiveComponent } from './alert-notifications-active.component';

describe('AlertNotificationsActiveComponent', () => {
  let component: AlertNotificationsActiveComponent;
  let fixture: ComponentFixture<AlertNotificationsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
