import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryIttComponent } from './advisory-itt.component';

describe('AdvisoryIttComponent', () => {
  let component: AdvisoryIttComponent;
  let fixture: ComponentFixture<AdvisoryIttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoryIttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryIttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
