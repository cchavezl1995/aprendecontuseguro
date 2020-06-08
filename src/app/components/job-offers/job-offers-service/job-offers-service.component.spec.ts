import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersServiceComponent } from './job-offers-service.component';

describe('JobOffersServiceComponent', () => {
  let component: JobOffersServiceComponent;
  let fixture: ComponentFixture<JobOffersServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOffersServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
