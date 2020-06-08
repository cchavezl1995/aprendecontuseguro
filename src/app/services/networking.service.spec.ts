import { TestBed } from '@angular/core/testing';

import { NetworkingService } from './networking.service';

describe('NetworkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkingService = TestBed.get(NetworkingService);
    expect(service).toBeTruthy();
  });
});
