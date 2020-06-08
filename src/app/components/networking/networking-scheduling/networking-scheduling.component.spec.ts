import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingSchedulingComponent } from './networking-scheduling.component';

describe('NetworkingSchedulingComponent', () => {
  let component: NetworkingSchedulingComponent;
  let fixture: ComponentFixture<NetworkingSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkingSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
