import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyServiceComponent } from './economy-study-service.component';

describe('EconomyStudyServiceComponent', () => {
  let component: EconomyStudyServiceComponent;
  let fixture: ComponentFixture<EconomyStudyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
