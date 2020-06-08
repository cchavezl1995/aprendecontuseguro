import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationsServiceComponent } from './alert-notifications-service.component';

describe('AlertNotificationsServiceComponent', () => {
  let component: AlertNotificationsServiceComponent;
  let fixture: ComponentFixture<AlertNotificationsServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationsServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
