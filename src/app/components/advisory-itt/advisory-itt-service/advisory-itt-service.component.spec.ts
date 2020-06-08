import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryIttServiceComponent } from './advisory-itt-service.component';

describe('AdvisoryIttServiceComponent', () => {
  let component: AdvisoryIttServiceComponent;
  let fixture: ComponentFixture<AdvisoryIttServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoryIttServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryIttServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
