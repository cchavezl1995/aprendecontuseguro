import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationsConfirmComponent } from './alert-notifications-confirm.component';

describe('AlertNotificationsConfirmComponent', () => {
  let component: AlertNotificationsConfirmComponent;
  let fixture: ComponentFixture<AlertNotificationsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationsConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
