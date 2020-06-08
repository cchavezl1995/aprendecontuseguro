import { TestBed } from '@angular/core/testing';

import { DigitalBrandingService } from './digital-branding.service';

describe('DigitalBrandingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DigitalBrandingService = TestBed.get(DigitalBrandingService);
    expect(service).toBeTruthy();
  });
});
