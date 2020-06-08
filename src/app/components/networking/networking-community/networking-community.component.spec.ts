import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkingCommunityComponent } from './networking-community.component';

describe('NetworkingCommunityComponent', () => {
  let component: NetworkingCommunityComponent;
  let fixture: ComponentFixture<NetworkingCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkingCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkingCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
