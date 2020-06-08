import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestMaterialComponent } from './interest-material.component';

describe('InterestMaterialComponent', () => {
  let component: InterestMaterialComponent;
  let fixture: ComponentFixture<InterestMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
