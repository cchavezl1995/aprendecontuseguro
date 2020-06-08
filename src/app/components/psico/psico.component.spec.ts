import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoComponent } from './psico.component';

describe('PsicoComponent', () => {
  let component: PsicoComponent;
  let fixture: ComponentFixture<PsicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
