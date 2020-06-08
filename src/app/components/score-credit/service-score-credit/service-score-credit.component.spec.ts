import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceScoreCreditComponent } from './service-score-credit.component';

describe('ServiceScoreCreditComponent', () => {
  let component: ServiceScoreCreditComponent;
  let fixture: ComponentFixture<ServiceScoreCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceScoreCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceScoreCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
