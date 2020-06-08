import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingEventDetailComponent } from './networking-event-detail.component';

describe('NetworkingEventDetailComponent', () => {
  let component: NetworkingEventDetailComponent;
  let fixture: ComponentFixture<NetworkingEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkingEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
