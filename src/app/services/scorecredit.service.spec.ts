import { TestBed } from '@angular/core/testing';

import { ScorecreditService } from './scorecredit.service';

describe('ScorecreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScorecreditService = TestBed.get(ScorecreditService);
    expect(service).toBeTruthy();
  });
});
