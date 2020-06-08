import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoTestsComponent } from './psico-tests.component';

describe('PsicoTestsComponent', () => {
  let component: PsicoTestsComponent;
  let fixture: ComponentFixture<PsicoTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
