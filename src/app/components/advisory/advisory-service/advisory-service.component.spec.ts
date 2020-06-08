import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryServiceComponent } from './advisory-service.component';

describe('AdvisoryServiceComponent', () => {
  let component: AdvisoryServiceComponent;
  let fixture: ComponentFixture<AdvisoryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
