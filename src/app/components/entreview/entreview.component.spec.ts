import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreviewComponent } from './entreview.component';

describe('EntreviewComponent', () => {
  let component: EntreviewComponent;
  let fixture: ComponentFixture<EntreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
