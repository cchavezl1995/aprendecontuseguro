import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNetworkingComponent } from './admin-networking.component';

describe('AdminNetworkingComponent', () => {
  let component: AdminNetworkingComponent;
  let fixture: ComponentFixture<AdminNetworkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNetworkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNetworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
