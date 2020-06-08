import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingServiceComponent } from './networking-service.component';

describe('NetworkingServiceComponent', () => {
  let component: NetworkingServiceComponent;
  let fixture: ComponentFixture<NetworkingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
