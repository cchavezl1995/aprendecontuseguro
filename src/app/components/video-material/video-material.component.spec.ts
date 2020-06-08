import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMaterialComponent } from './video-material.component';

describe('VideoMaterialComponent', () => {
  let component: VideoMaterialComponent;
  let fixture: ComponentFixture<VideoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
