import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingEventsComponent } from './networking-events.component';

describe('NetworkingEventsComponent', () => {
  let component: NetworkingEventsComponent;
  let fixture: ComponentFixture<NetworkingEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkingEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
