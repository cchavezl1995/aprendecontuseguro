import { TestBed } from '@angular/core/testing';

import { SaludFinService } from './salud-fin.service';

describe('SaludFinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaludFinService = TestBed.get(SaludFinService);
    expect(service).toBeTruthy();
  });
});
