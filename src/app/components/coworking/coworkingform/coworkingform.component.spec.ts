import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingformComponent } from './coworkingform.component';

describe('CoworkingformComponent', () => {
  let component: CoworkingformComponent;
  let fixture: ComponentFixture<CoworkingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoworkingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
