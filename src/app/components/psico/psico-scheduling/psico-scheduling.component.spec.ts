import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoSchedulingComponent } from './psico-scheduling.component';

describe('PsicoSchedulingComponent', () => {
  let component: PsicoSchedulingComponent;
  let fixture: ComponentFixture<PsicoSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
