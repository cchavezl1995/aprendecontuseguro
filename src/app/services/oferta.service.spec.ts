import { TestBed } from '@angular/core/testing';

import { OfertaService } from './oferta.service';

describe('OfertaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfertaService = TestBed.get(OfertaService);
    expect(service).toBeTruthy();
  });
});
