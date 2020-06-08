import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumHomeComponent } from './curriculum-home.component';

describe('CurriculumHomeComponent', () => {
  let component: CurriculumHomeComponent;
  let fixture: ComponentFixture<CurriculumHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
