import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyStudyComponent } from './economy-study.component';

describe('EconomyStudyComponent', () => {
  let component: EconomyStudyComponent;
  let fixture: ComponentFixture<EconomyStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
