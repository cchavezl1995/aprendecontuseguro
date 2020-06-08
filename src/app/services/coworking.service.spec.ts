import { TestBed } from '@angular/core/testing';

import { CoworkingService } from './coworking.service';

describe('CoworkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoworkingService = TestBed.get(CoworkingService);
    expect(service).toBeTruthy();
  });
});
